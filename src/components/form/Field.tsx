import React, { cloneElement, ReactElement, PropsWithChildren, Children, Component } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, View, ViewStyle } from 'react-native'
import { FormContext } from './contexts';
import { IFieldEntity, IFieldProps, ValueType } from './interface';
import { HOOK_MARK } from './contexts';
import { validateField } from './utils';
import { styleUtils } from '../../utils';
import { ConfigContext } from '../config-provider';

export class Field extends Component<PropsWithChildren<IFieldProps>> implements IFieldEntity {
    static contextType = FormContext;

    init = false;

    componentDidMount(): void {
        if (!this.init) {
            const { name, initialValue } = this.props;
            const { registerField, setInitialValue } = this.context.getInternalHooks(HOOK_MARK);

            this.init = true;
            registerField(this);

            if (name) {
                setInitialValue(name, initialValue);
            }
        }
    }

    componentWillUnmount() {
        const { unregisterField } = this.context.getInternalHooks(HOOK_MARK);
        unregisterField(this)
    }

    reRender = (): void => {
        this.forceUpdate();
    }

    validateRules = async (value: ValueType): Promise<void> => {
        const { name, rules, errorHandler } = this.props;
        if (!name) {
            return
        }

        const { setFieldError, removeFieldError } = this.context.getInternalHooks(HOOK_MARK);
        const { getFieldError } = this.context;

        try {
            const [hasError, message] = await validateField(value, this.context, name, rules);
            
            if (hasError) {
                errorHandler?.(message);
                setFieldError(name, message);
            } else if (getFieldError(name)) {
                removeFieldError(name);
            }
        } catch (e) {
            console.error(e);
        }
    }

    getControlled = (childProps: Record<string, any>): Record<string, any> => {
        const {
            name,
            valuePropName,
            changeMethodName,
            validateTrigger,
            numeric
        } = this.props;
        const { getFieldValue, setFieldValue } = this.context;

        if (!name) {
            return { ...childProps }
        }
        
        return {
            ...childProps,
            [valuePropName]: getFieldValue(name),
            [changeMethodName]: (val: any) => {
                const value = numeric ? Number(val) : val
                
                setFieldValue(name, numeric ? Number(value) : value);
                
                if (validateTrigger === 'onChange') {
                    this.validateRules(value);
                }

                childProps[changeMethodName]?.(value);
            },
            onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
                // TODO: onBlur校验除Input组件外的其他组件
                if (validateTrigger === 'onBlur') {
                    this.validateRules(e?.nativeEvent?.text);
                }

                childProps.onBlur?.(e);
            }
        };
    };

    render(): ReactElement | null {
        const children: any = this.props.children;
        
        if (!children) {
            return null;
        }

        const { col, inputComponent, style } = this.props;

        let fieldStyle: StyleProp<ViewStyle> = [{ justifyContent: 'center', alignItems: 'center' }, style];
        if (col) {
            if (col.span) {
                fieldStyle = fieldStyle.concat(styleUtils[`span-${col.span}`]);
            }
            if (col.offset) {
                fieldStyle = fieldStyle.concat(styleUtils[`offset-${col.offset}`]);
            }
        }
        
        return (
            <View style={fieldStyle}>
                <ConfigContext.Consumer>
                    {({ showSoftInputOnFocus }) => {
                        if (typeof children === 'function') {
                            return children(this.context)
                        }

                        return Children.map(children, c => {
                            if (c) {
                                if (c.type === inputComponent) {
                                    return cloneElement(c, this.getControlled({
                                        ...c.props,
                                        showSoftInputOnFocus: c.props.showSoftInputOnFocus ?? showSoftInputOnFocus
                                    }));
                                }

                                return cloneElement(c, this.getControlled(c.props))
                            }

                            return c
                        })
                    }}
                </ConfigContext.Consumer>
            </View>
        )
    }
}