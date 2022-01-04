import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { isString, isUndefined } from '../../utils';
import { useTheme } from '../../hooks';
export const Checkbox = ({ checked: propsChecked, defaultChecked, wrapperStyle, iconStyle, contentStyle, checkedColor: chcolor, uncheckColor: uncolor, children, onChange }) => {
    const [checked, setChecked] = useState(() => {
        const c = isUndefined(propsChecked) ? defaultChecked : propsChecked;
        return c !== null && c !== void 0 ? c : false;
    });
    const colors = useTheme();
    const checkedColor = chcolor ? chcolor : colors.primary;
    const uncheckColor = uncolor ? uncolor : colors.border;
    useEffect(() => {
        setChecked(propsChecked !== null && propsChecked !== void 0 ? propsChecked : false);
    }, [propsChecked]);
    const handleChange = () => {
        if (isUndefined(propsChecked)) {
            setChecked(!checked);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
    };
    return (React.createElement(Pressable, { style: [styles.container, wrapperStyle], onPress: handleChange },
        React.createElement(Icon, { style: [styles.icon, iconStyle], name: checked ? 'check-square' : 'square', color: checked ? checkedColor : uncheckColor, size: 18 }),
        React.createElement(View, { style: [styles.content, contentStyle] }, isString(children)
            ? React.createElement(Text, { style: { color: '#000000d9', fontSize: 14 } }, children)
            : children)));
};
Checkbox.displayName = 'Checkbox';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {},
    content: {
        marginLeft: 5
    }
});
