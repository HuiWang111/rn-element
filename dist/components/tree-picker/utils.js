import { omit } from '../../utils';
export const getDepth = (options) => {
    if (!options.length) {
        return 0;
    }
    let depth = 1;
    const recursive = (item, acc = 1) => {
        depth = Math.max(depth, acc);
        if (item.children && item.children.length) {
            item.children.forEach(c => recursive(c, acc + 1));
        }
    };
    options.forEach(option => recursive(option));
    return depth;
};
export const getListByDepth = (depth, options, value, filterOption, keyword) => {
    var _a, _b, _c;
    if (depth === 0) {
        const list = options.map(o => omit(o, ['children']));
        return keyword
            ? filterList(list, keyword, filterOption)
            : list;
    }
    else if (depth === 1) {
        const [firstValue] = value;
        const firstDepthChildren = (_a = options.find(o => o.value === firstValue)) === null || _a === void 0 ? void 0 : _a.children;
        const list = (firstDepthChildren === null || firstDepthChildren === void 0 ? void 0 : firstDepthChildren.map(c => omit(c, ['children']))) || [];
        return keyword
            ? filterList(list, keyword, filterOption)
            : list;
    }
    const [firstValue, secondValue] = value;
    const firstDepthChildren = (_b = options.find(o => o.value === firstValue)) === null || _b === void 0 ? void 0 : _b.children;
    const secondDepthChildren = (_c = firstDepthChildren === null || firstDepthChildren === void 0 ? void 0 : firstDepthChildren.find(c => c.value === secondValue)) === null || _c === void 0 ? void 0 : _c.children;
    const list = (secondDepthChildren === null || secondDepthChildren === void 0 ? void 0 : secondDepthChildren.map(c => omit(c, ['children']))) || [];
    return keyword
        ? filterList(list, keyword, filterOption)
        : list;
};
const filterList = (list, keyword, filterOption) => {
    return list.filter(item => filterOption(keyword, item));
};
export const getLabelsByValue = (options, value) => {
    if (!value.length || !options.length) {
        return [];
    }
    const labels = [];
    const loop = (list, ls, val, index = 0) => {
        for (const item of list) {
            if (item.value === val[index]) {
                ls[index] = item.label;
                loop(item.children || [], ls, val, index + 1);
                break;
            }
        }
        if (!ls[index]) {
            ls[index] = val[index];
        }
    };
    loop(options, labels, value);
    return labels.filter(Boolean);
};
