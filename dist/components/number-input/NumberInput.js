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
import { TextInput } from 'react-native';
import { regExp } from '../../utils';
const NumberInput = (_a) => {
    var { value, onChangeText, onBlur } = _a, restPropos = __rest(_a, ["value", "onChangeText", "onBlur"]);
    const handleChangeText = (val) => {
        if (!onChangeText) {
            return;
        }
        if (val !== '-' && val !== '' && !regExp.number.test(val)) {
            return;
        }
        onChangeText(val);
    };
    const handleBlur = (e) => {
        if (onChangeText && value !== '-') {
            if (!value) {
                onChangeText(undefined);
            }
            else {
                onChangeText(Number(value));
            }
        }
        onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    };
    return (React.createElement(TextInput, Object.assign({ onChangeText: handleChangeText, value: value ? String(value) : '', onBlur: handleBlur }, restPropos)));
};
NumberInput.displayName = 'NumberInput';
export default NumberInput;
