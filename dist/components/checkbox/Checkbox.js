import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { ThemeContext } from '../theme-provider';
import { isString } from '../../utils';
export const Checkbox = ({ checked: propsChecked = false, wrapperStyle, iconStyle, contentStyle, checkedColor: chcolor, uncheckColor: uncolor, children, onChange }) => {
    const [checked, setChecked] = useState(propsChecked);
    const colors = useContext(ThemeContext);
    const checkedColor = chcolor ? chcolor : colors.primary;
    const uncheckColor = uncolor ? uncolor : colors.border;
    useEffect(() => {
        setChecked(propsChecked);
    }, [propsChecked]);
    const handleChange = () => {
        onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
    };
    return (React.createElement(Pressable, { style: [styles.container, wrapperStyle], onPress: handleChange },
        React.createElement(Icon, { style: [styles.icon, iconStyle], name: checked ? 'check-square' : 'square', color: checked ? checkedColor : uncheckColor, onPress: handleChange, size: 18 }),
        React.createElement(View, { style: [styles.content, contentStyle] }, isString(children)
            ? React.createElement(Text, { style: { color: '#000000d9', fontSize: 14 } }, children)
            : children)));
};
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
