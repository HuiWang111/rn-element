import { error, black, border, primary, warning, success } from './color';
import regExp from './regExp';
export { isArray, isBoolean, isFunction, isNull, isNumber, isObject, isPlainObject, isString, isUndefined, isNil, isInteger, isFloat, getType } from './validate';
export { warning } from './warning';
export const colors = {
    error,
    black,
    border,
    primary,
    warning,
    success
};
export { styleUtils, mergeStyle } from './styles';
export { omit, keyBy, isArrayShallowEqual, last } from './tools';
export { regExp };
