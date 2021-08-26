const _toString = Object.prototype.toString;
export function getType(value, strict = false) {
    const typeofValue = typeof value;
    if (typeofValue !== 'object') {
        if (strict && typeofValue === 'number') {
            return value % 1 === 0
                ? 'integer'
                : 'float';
        }
        return typeofValue;
    }
    const toStringRes = _toString.call(value);
    const type = toStringRes.slice(8, toStringRes.length - 1).toLowerCase();
    if (strict && type === 'number') {
        return value % 1 === 0
            ? 'integer'
            : 'float';
    }
    return type;
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isString(value) {
    return getType(value) === 'string';
}
export function isBoolean(value) {
    return getType(value) === 'boolean';
}
export function isFunction(value) {
    return getType(value) === 'function';
}
export function isUndefined(value) {
    return getType(value) === 'undefined';
}
export function isNull(value) {
    return getType(value) === 'null';
}
export function isNumber(value) {
    return getType(value) === 'number';
}
export function isObject(value) {
    return typeof value === 'object' && value !== null;
}
export function isPlainObject(value) {
    return getType(value) === 'object';
}
export function isNil(value) {
    return value == null;
}
export function isInteger(value) {
    return isNumber(value) && value % 1 === 0;
}
export function isFloat(value) {
    return isNumber(value) && value % 1 !== 0;
}
