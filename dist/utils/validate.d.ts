export declare function getType(value: any, strict?: boolean): string;
export declare function isArray(value: any): value is any[];
export declare function isString(value: any): value is string;
export declare function isBoolean(value: any): value is boolean;
export declare function isFunction<T = any>(value: any): value is (...args: any[]) => T;
export declare function isUndefined(value: any): value is undefined;
export declare function isNull(value: any): value is null;
export declare function isNumber(value: any): value is number;
export declare function isObject(value: any): boolean;
export declare function isPlainObject(value: any): value is Record<string, any>;
export declare function isNil(value: any): value is null | undefined;
export declare function isInteger(value: any): boolean;
export declare function isFloat(value: any): boolean;
