var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { cloneElement, Children, Component } from 'react';
import { View } from 'react-native';
import { FormContext } from './contexts';
import { HOOK_MARK } from './contexts';
import { validateField } from './utils';
import { styleUtils } from '../../utils';
import { ConfigContext } from '../config-provider';
export class Field extends Component {
    constructor() {
        super(...arguments);
        this.init = false;
        this.reRender = () => {
            this.forceUpdate();
        };
        this.validateRules = (value) => __awaiter(this, void 0, void 0, function* () {
            const { name, rules, errorHandler } = this.props;
            const { setFieldError, removeFieldError } = this.context.getInternalHooks(HOOK_MARK);
            const { getFieldError } = this.context;
            try {
                const [hasError, message] = yield validateField(value, this.context, name, rules);
                if (hasError) {
                    errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(message);
                    setFieldError(name, message);
                }
                else if (getFieldError(name)) {
                    removeFieldError(name);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
        this.getControlled = (childProps) => {
            const { name, valuePropName, changeMethodName, validateTrigger } = this.props;
            const { getFieldValue, setFieldValue } = this.context;
            return Object.assign(Object.assign({}, childProps), { [valuePropName]: getFieldValue(name), [changeMethodName]: (value) => {
                    var _a;
                    setFieldValue(name, value);
                    if (validateTrigger === 'onChange') {
                        this.validateRules(value);
                    }
                    (_a = childProps[changeMethodName]) === null || _a === void 0 ? void 0 : _a.call(childProps, value);
                }, onBlur: (e) => {
                    var _a;
                    if (validateTrigger === 'onBlur') {
                        this.validateRules((_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.text);
                    }
                } });
        };
    }
    componentDidMount() {
        if (!this.init) {
            const { name, initialValue } = this.props;
            const { registerField, setInitialValue } = this.context.getInternalHooks(HOOK_MARK);
            this.init = true;
            registerField(this);
            setInitialValue(name, initialValue);
        }
    }
    render() {
        const children = this.props.children;
        if (!children) {
            return null;
        }
        const { col, inputComponent, style } = this.props;
        let fieldStyle = [{ justifyContent: 'center', alignItems: 'center' }, style];
        if (col) {
            if (col.span) {
                fieldStyle = fieldStyle.concat(styleUtils[`span-${col.span}`]);
            }
            if (col.offset) {
                fieldStyle = fieldStyle.concat(styleUtils[`offset-${col.offset}`]);
            }
        }
        return (React.createElement(View, { style: fieldStyle },
            React.createElement(ConfigContext.Consumer, null, ({ showSoftInputOnFocus }) => {
                return Children.map(children, c => {
                    if (c.type === inputComponent) {
                        return cloneElement(c, this.getControlled(Object.assign(Object.assign({}, c.props), { showSoftInputOnFocus })));
                    }
                    return cloneElement(c, this.getControlled(c.props));
                });
            })));
    }
}
Field.contextType = FormContext;
