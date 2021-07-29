import { createContext } from 'react';
import { StoreValue, ValueType, IFormStore, InternalHooks } from './interface';
import { warning } from '../../utils';

export const HOOK_MARK = 'RN-ELEMENT-INTERNAL-HOOKS';

const warningFuncWithValue = (): StoreValue => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {}
};

const warningFuncWithMsg = (): string => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return '';
};

const warningFuncWithError = (): Record<string, string> => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {};
};

const warningFunc = (): void => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
};

const promiseWarningFuncWithValue = (): Promise<ValueType> => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return Promise.resolve();
}

const internalHooksWarningFunc = (): InternalHooks => {
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
}

export const FormContext = createContext<IFormStore>({
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