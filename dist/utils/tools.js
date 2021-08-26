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
