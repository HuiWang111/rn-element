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
import { View } from 'react-native';
const InternalListItem = ({ isActive, activeStyle, style, children }) => {
    return (React.createElement(View, { style: [style, isActive ? activeStyle : null] }, children));
};
export const ListItem = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(InternalListItem, Object.assign({}, props, { isActivable: false }), children));
};
ListItem.displayName = 'ListItem';
export const ActivableListItem = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(InternalListItem, Object.assign({}, props, { isActivable: true }), children));
};
ActivableListItem.displayName = 'ActivableListItem';
