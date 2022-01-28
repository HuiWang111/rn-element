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
import React, { forwardRef } from 'react';
import { Input } from '../input';
import Icon from 'react-native-vector-icons/AntDesign';
const defaultIcon = React.createElement(Icon, { name: 'down' });
export const PickerInput = forwardRef((_a, ref) => {
    var { rightIcon = defaultIcon } = _a, restProps = __rest(_a, ["rightIcon"]);
    const noop = () => {
    };
    return (React.createElement(Input, Object.assign({}, restProps, { onChangeText: noop, rightIcon: rightIcon, ref: ref })));
});
PickerInput.displayName = 'PickerInput';
