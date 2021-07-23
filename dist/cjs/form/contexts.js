"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormContext = exports.HOOK_MARK = void 0;
var react_1 = require("react");
var utils_1 = require("../utils");
exports.HOOK_MARK = 'RN-ELEMENT-INTERNAL-HOOKS';
var warningFuncWithValue = function () {
    utils_1.warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {};
};
var warningFuncWithMsg = function () {
    utils_1.warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return '';
};
var warningFuncWithError = function () {
    utils_1.warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {};
};
var warningFunc = function () {
    utils_1.warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
};
var promiseWarningFuncWithValue = function () {
    utils_1.warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return Promise.resolve();
};
var internalHooksWarningFunc = function () {
    utils_1.warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
    return {
        getForm: function () { return ({
            getFieldsValue: warningFuncWithValue,
            getFieldValue: warningFuncWithValue,
            resetFields: warningFunc,
            setFieldsValue: warningFunc,
            setFieldValue: warningFunc,
            validateFields: promiseWarningFuncWithValue,
            getFieldError: warningFuncWithMsg,
            getFieldsError: warningFuncWithError,
            getInternalHooks: internalHooksWarningFunc
        }); },
        registerField: warningFunc,
        setFieldError: warningFunc,
        setInitialValue: warningFunc,
        removeFieldError: warningFunc
    };
};
exports.FormContext = react_1.createContext({
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
