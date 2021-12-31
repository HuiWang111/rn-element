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
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../../utils';
import { BaseHeight } from '../../constants';
export const Input = forwardRef((_a, ref) => {
    var { clearable = true, editable = true, style, wrapStyle, value, onChangeText } = _a, restProps = __rest(_a, ["clearable", "editable", "style", "wrapStyle", "value", "onChangeText"]);
    const handleClear = () => {
        onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText('');
    };
    return (React.createElement(View, { style: [
            styles.inputContainer,
            wrapStyle,
            !editable ? styles.disabledInputContainer : null
        ] },
        React.createElement(TextInput, Object.assign({ editable: editable, ref: ref, style: [
                styles.input,
                style,
                !editable ? styles.disabledInput : null,
                clearable ? { marginRight: 5 } : null
            ], value: value, onChangeText: onChangeText }, restProps)),
        clearable && editable && Boolean(value) && (React.createElement(View, { style: styles.closeIconWrap },
            React.createElement(Icon, { name: 'closecircle', style: styles.closeIcon, onPress: handleClear })))));
});
Input.displayName = 'Input';
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: BaseHeight,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        borderRadius: 2,
        paddingHorizontal: 10
    },
    disabledInputContainer: {
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9'
    },
    input: {
        color: '#000',
        flex: 1,
        height: BaseHeight,
        padding: 0
    },
    disabledInput: {
        color: '#00000040'
    },
    closeIconWrap: {
        width: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeIcon: {
        color: '#00000040'
    }
});
