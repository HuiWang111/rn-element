export const getDefaultValue = (options) => {
    var _a, _b;
    const value = [];
    if (options.length) {
        const firstDepthOption = options[0];
        value.push(firstDepthOption.value);
        if ((_a = firstDepthOption.children) === null || _a === void 0 ? void 0 : _a.length) {
            const secondaryDepthOption = firstDepthOption.children[0];
            value.push(secondaryDepthOption.value);
            if ((_b = secondaryDepthOption.children) === null || _b === void 0 ? void 0 : _b.length) {
                const thirdDepthOption = secondaryDepthOption.children[0];
                value.push(thirdDepthOption.value);
            }
        }
    }
    return value;
};
export const getDefaultColumns = (options) => {
    var _a, _b;
    const value = [];
    if (options.length) {
        const firstDepthOption = options[0];
        value.push(options.map(o => ({ label: o.label, value: o.value })));
        if ((_a = firstDepthOption.children) === null || _a === void 0 ? void 0 : _a.length) {
            const secondaryDepthOption = firstDepthOption.children[0];
            value.push(firstDepthOption.children.map(o => ({ label: o.label, value: o.value })));
            if ((_b = secondaryDepthOption.children) === null || _b === void 0 ? void 0 : _b.length) {
                value.push(secondaryDepthOption.children);
            }
        }
    }
    return value;
};
