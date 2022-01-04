var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { BaseGroup } from '../base';
export const RadioGroup = (_a) => {
    var { defaultValue, value, children, onChange } = _a, rest = __rest(_a, ["defaultValue", "value", "children", "onChange"]);
    return (React.createElement(BaseGroup, Object.assign({ defaultValue: defaultValue ? [defaultValue] : undefined, value: value ? [value] : undefined, onChange: (value) => onChange === null || onChange === void 0 ? void 0 : onChange(value[0]) }, rest), children));
};
RadioGroup.displayName = 'RadioGroup';
