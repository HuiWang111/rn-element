export declare function omit(object?: Record<string, any>, omitKeys?: string[]): Record<string, any>;
export declare function keyBy<T extends Record<string, any>>(collection: T[], iteratee: string | ((item: T) => void)): Record<string, any>;
export declare function isArrayShallowEqual(arr1: any[], arr2: any[]): boolean;
export declare function last(arr: any[]): any;
