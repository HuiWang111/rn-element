import { error, black, border, primary } from './color';
import regExp from './regExp';
export { isArray, isBoolean, isFunction, isNull, isNumber, isObject, isPlainObject, isString, isUndefined, isNil, isInteger, isFloat, getType } from './validate';
export { warning } from './warning';
export const colors = {
    error,
    black,
    border,
    primary
};
export { styleUtils, mergeStyle } from './styles';
export { omit, keyBy } from './tools';
export { regExp };
