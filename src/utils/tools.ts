export function omit(object?: Record<string, any>, omitKeys?: string[]): Record<string, any> {
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
