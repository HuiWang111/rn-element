import { createContext } from 'react';
import { warning } from '../../utils';
export const HOOK_MARK = 'RN-ELEMENT-INTERNAL-HOOKS';
const warningFuncWithValue = () => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {};
};
const warningFuncWithMsg = () => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return '';
};
const warningFuncWithError = () => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {};
};
const warningFunc = () => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
};
const promiseWarningFuncWithValue = () => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return Promise.resolve();
};
const internalHooksWarningFunc = () => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {
        getForm: () => ({
            getFieldsValue: warningFuncWithValue,
            getFieldValue: warningFuncWithValue,
            resetFields: warningFunc,
            setFieldsValue: warningFunc,
            setFieldValue: warningFunc,
            validateFields: promiseWarningFuncWithValue,
            getFieldError: warningFuncWithMsg,
            getFieldsError: warningFuncWithError,
            getInternalHooks: internalHooksWarningFunc
        }),
        registerField: warningFunc,
        setFieldError: warningFunc,
        setInitialValue: warningFunc,
        removeFieldError: warningFunc
    };
};
export const FormContext = createContext({
    getFieldsValue: warningFuncWithValue,
    getFieldValue: warningFuncWithValue,
    resetFields: warningFunc,
    setFieldsValue: warningFunc,
    setFieldValue: warningFunc,
    validateFields: promiseWarningFuncWithValue,
    getInternalHooks: internalHooksWarningFunc,
    getFieldError: warningFuncWithMsg,
    getFieldsError: warningFuncWithError,
});
