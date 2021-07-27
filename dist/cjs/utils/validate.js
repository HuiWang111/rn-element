"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFloat = exports.isInteger = exports.isNil = exports.isPlainObject = exports.isObject = exports.isNumber = exports.isNull = exports.isUndefined = exports.isFunction = exports.isBoolean = exports.isString = exports.isArray = exports.getType = void 0;
var _toString = Object.prototype.toString;
function getType(value, strict) {
    if (strict === void 0) { strict = false; }
    var typeofValue = typeof value;
    if (typeofValue !== 'object') {
        if (strict && typeofValue === 'number') {
            return value % 1 === 0
                ? 'integer'
                : 'float';
        }
        return typeofValue;
    }
    var toStringRes = _toString.call(value);
    var type = toStringRes.slice(8, toStringRes.length - 1).toLowerCase();
    if (strict && type === 'number') {
        return value % 1 === 0
            ? 'integer'
            : 'float';
    }
    return type;
}
exports.getType = getType;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isString(value) {
    return getType(value) === 'string';
}
exports.isString = isString;
function isBoolean(value) {
    return getType(value) === 'boolean';
}
exports.isBoolean = isBoolean;
function isFunction(value) {
    return getType(value) === 'function';
}
exports.isFunction = isFunction;
function isUndefined(value) {
    return getType(value) === 'undefined';
}
exports.isUndefined = isUndefined;
function isNull(value) {
    return getType(value) === 'null';
}
exports.isNull = isNull;
function isNumber(value) {
    return getType(value) === 'number';
}
exports.isNumber = isNumber;
function isObject(value) {
    return typeof value === 'object' && value !== null;
}
exports.isObject = isObject;
function isPlainObject(value) {
    return getType(value) === 'object';
}
exports.isPlainObject = isPlainObject;
function isNil(value) {
    return value == null;
}
exports.isNil = isNil;
function isInteger(value) {
    return isNumber(value) && value % 1 === 0;
}
exports.isInteger = isInteger;
function isFloat(value) {
    return isNumber(value) && value % 1 !== 0;
}
exports.isFloat = isFloat;
