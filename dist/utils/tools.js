import { isArray, isString, isFunction } from './validate';
export function omit(object, omitKeys) {
    if (!object) {
        return {};
    }
    if (!omitKeys || !omitKeys.length) {
        return object;
    }
    const res = {};
    const set = new Set(omitKeys);
    for (const key in object) {
        if (!set.has(key)) {
            res[key] = object[key];
        }
    }
    return res;
}
export function keyBy(collection, iteratee) {
    if (!isArray(collection)) {
        throw new Error('[keyBy] param `collection` must be an array');
    }
    if (!isString(iteratee) && !isFunction(iteratee)) {
        throw new Error('[keyBy] param `iteratee` must be a string or function');
    }
    return collection.reduce((map, item) => {
        const key = isString(iteratee) ? item[iteratee] : iteratee(item);
        map[key] = item;
        return map;
    }, {});
}
export function isArrayShallowEqual(arr1, arr2) {
    if (!isArray(arr1) || !isArray(arr2)) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    if (arr1.length === 0 && arr2.length === 0) {
        return true;
    }
    if (arr1.some((item, index) => item !== arr2[index])) {
        return false;
    }
    return true;
}
export function last(arr) {
    return arr[arr.length - 1];
}
