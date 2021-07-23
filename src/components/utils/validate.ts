/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const _toString = Object.prototype.toString;

export function getType(value: any, strict = false): string {
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

export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}

export function isString(value: any): value is string {
    return getType(value) === 'string';
}

export function isBoolean(value: any): value is boolean {
    return getType(value) === 'boolean';
}

export function isFunction<T = any>(value: any): value is (...args: any[]) => T {
    return getType(value) === 'function';
}

export function isUndefined(value: any): value is undefined {
    return getType(value) === 'undefined';
}

export function isNull(value: any): value is null {
    return getType(value) === 'null';
}

export function isNumber(value: any): value is number {
    return getType(value) === 'number';
}

export function isObect(value: any): boolean {
    return typeof value === 'object' && value !== null;
}

export function isPlainObject(value: any): value is Record<string, any> {
    return getType(value) === 'object';
}

export function isNil(value: any): value is null | undefined {
    return value == null;
}

export function isInteger(value: any): boolean {
    return isNumber(value) && value % 1 === 0;
}

export function isFloat(value: any): boolean {
    return isNumber(value) && value % 1 !== 0;
}