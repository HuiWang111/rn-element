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
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export const Input = (_a) => {
    var { clearable = true, editable = true, style, value, onChangeText } = _a, restProps = __rest(_a, ["clearable", "editable", "style", "value", "onChangeText"]);
    const handleClear = () => {
        onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText('');
    };
    return (React.createElement(View, null,
        React.createElement(TextInput, Object.assign({ editable: editable, style: [
                styles.input,
                style,
                !editable ? styles.disabledInput : null,
                clearable ? { paddingRight: 24 } : null
            ], value: value, onChangeText: onChangeText }, restProps)),
        clearable && editable && Boolean(value) && (React.createElement(View, { style: styles.closeIconWrap },
            React.createElement(Icon, { name: 'closecircle', style: styles.closeIcon, onPress: handleClear })))));
};
const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative'
    },
    input: {
        color: '#000'
    },
    disabledInput: {
        backgroundColor: '#f5f5f5',
        color: '#00000040',
        borderColor: '#d9d9d9'
    },
    closeIconWrap: {
        width: 20,
        height: '100%',
        position: 'absolute',
        right: 2,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeIcon: {
        color: '#00000040',
        width: 20,
        height: 20
    }
});
