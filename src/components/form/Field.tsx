import React, { cloneElement, ReactElement, PropsWithChildren, Children, Component } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, StyleSheet, View, Text } from 'react-native'
import { FormContext } from './contexts';
import { IFieldEntity, IFieldProps, ValueType } from './interface';
import { HOOK_MARK } from './contexts';
import { validateField } from './utils';
import { styleUtils, colors } from '../utils';

export class Field extends Component<PropsWithChildren<IFieldProps>> implements IFieldEntity {
    static contextType = FormContext;

    init = false;

    state = {
        message: ''
    }

    componentDidMount(): void {
        if (!this.init) {
            const { name, initialValue } = this.props;
            const { registerField, setInitialValue } = this.context.getInternalHooks(HOOK_MARK);

            this.init = true;
            registerField(this);
            setInitialValue(name, initialValue);
        }
    }

    setMessage = (message: string): void => {
        this.setState({
            message
        });
    } 

    reRender = (): void => {
        this.forceUpdate();
    }

    validateRules = async (value: ValueType): Promise<void> => {
        const { name, rules } = this.props;
        const { setFieldError, removeFieldError } = this.context.getInternalHooks(HOOK_MARK);
        const { getFieldError } = this.context;

        const [hasError, message] = await validateField(value, this.context, name, rules);

        if (hasError) {
            this.setMessage(message);
            setFieldError(name, message);
        } else if (getFieldError(name)) {
            this.setMessage('');
            removeFieldError(name);
        }
    }

    getControlled = (childProps: Record<string, any>): Record<string, any> => {
        const {
            name,
            valuePropName,
            changeMethodName,
            validateTrigger
        } = this.props;
        const { getFieldValue, setFieldValue } = this.context;

        return {
            ...childProps,
            [valuePropName]: getFieldValue(name),
            [changeMethodName]: (value: string) => {
                setFieldValue(name, value);

                if (validateTrigger === 'onChange') {
                    this.validateRules(value);
                }
            },
            onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
                if (validateTrigger === 'onBlur') {
                    this.validateRules(e?.nativeEvent?.text);
                }
            }
        };
    };

    render(): ReactElement | null {
        const children = this.props.children as ReactElement[];

        if (!children) {
            return null;
        }

        const { col } = this.props;
        const { message } = this.state;

        let fieldStyle = [styles.field];
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
                {
                    Children.map(children, c => {
                        return cloneElement(c, this.getControlled(c.props))
                    })
                }
                {
                    message ? (
                        <View style={[styles.formItemError]}>
                            <Text style={[styles.formItemErrorMsg]}>{message}</Text>
                        </View>
                    ) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {},
    formItemError: {
        minHeight: 24
    },
    formItemErrorMsg: {
        color: colors.error,
        fontSize: 14
    }
})