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
import { last } from '../../utils';
import { CheckList } from '../checkbox/List';
export const RadioList = (_a) => {
    var { value, defaultValue, onChange } = _a, rest = __rest(_a, ["value", "defaultValue", "onChange"]);
    const handleChange = (value) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(last(value));
    };
    return (React.createElement(CheckList, Object.assign({}, rest, { value: value ? [value] : undefined, defaultValue: defaultValue ? [defaultValue] : undefined, onChange: handleChange })));
};
RadioList.displayName = 'RadioList';
