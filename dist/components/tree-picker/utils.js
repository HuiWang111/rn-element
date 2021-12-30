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
export const getListByDepth = (depth, options, value, keyword) => {
    var _a, _b, _c;
    if (depth === 0) {
        return filterList(options.map(o => omit(o, ['children'])), keyword);
    }
    else if (depth === 1) {
        const [firstValue] = value;
        const firstDepthChildren = (_a = options.find(o => o.value === firstValue)) === null || _a === void 0 ? void 0 : _a.children;
        return filterList((firstDepthChildren === null || firstDepthChildren === void 0 ? void 0 : firstDepthChildren.map(c => omit(c, ['children']))) || [], keyword);
    }
    const [firstValue, secondValue] = value;
    const firstDepthChildren = (_b = options.find(o => o.value === firstValue)) === null || _b === void 0 ? void 0 : _b.children;
    const secondDepthChildren = (_c = firstDepthChildren === null || firstDepthChildren === void 0 ? void 0 : firstDepthChildren.find(c => c.value === secondValue)) === null || _c === void 0 ? void 0 : _c.children;
    return filterList((secondDepthChildren === null || secondDepthChildren === void 0 ? void 0 : secondDepthChildren.map(c => omit(c, ['children']))) || [], keyword);
};
const filterList = (list, keyword) => {
    return list.filter(item => item.label.includes(keyword));
};
