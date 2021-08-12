import {
    error,
    black,
    border
} from './color';
import regExp from './regExp';

export {
    isArray,
    isBoolean,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isPlainObject,
    isString,
    isUndefined,
    isNil,
    isInteger,
    isFloat,
    getType
} from './validate';

export { warning } from './warning';

export const colors = {
    error,
    black,
    border
};

export { styleUtils, mergeStyle } from './styles';

export { StyleType } from './interface';

export { omit, keyBy } from './tools';

export { regExp };