import { isArray, isString, isFunction } from './validate'

export function omit(object?: Record<string, any>, omitKeys?: string[]): Record<string, any> {
    if (!object) {
        return {}
    }

    if (!omitKeys || !omitKeys.length) {
        return object
    }

    const res = {}
    const set = new Set(omitKeys)
    for (const key in object) {
        if (!set.has(key)) {
            res[key] = object[key]
        }
    }

    return res
}

export function keyBy<T extends Record<string, any>>(
    collection: T[],
    iteratee: string | ((item: T) => void)
): Record<string, any> {
    if (!isArray(collection)) {
        throw new Error('[keyBy] param `collection` must be an array')
    }
    if (!isString(iteratee) && !isFunction(iteratee)) {
        throw new Error('[keyBy] param `iteratee` must be a string or function')
    }

    return collection.reduce((map, item): Record<string, unknown> => {
        const key = isString(iteratee) ? item[iteratee] : iteratee(item)
        map[key] = item
        return map
    }, {})
}

export function isArrayShallowEqual(arr1: any[], arr2: any[]) {
    if (!isArray(arr1) || !isArray(arr2)) {
        return false
    }

    if (arr1.length !== arr2.length) {
        return false
    }

    if (arr1.length === 0 && arr2.length === 0) {
        return true
    }

    if (arr1.some((item, index) => item !== arr2[index])) {
        return false
    }

    return true
}

export function last(arr: any[]): any {
    return arr[arr.length - 1]
}
