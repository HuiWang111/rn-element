import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { isString, isUndefined } from '../../utils';
import { useTheme } from '../../hooks';
export const Radio = ({ checked: propsChecked, defaultChecked = false, wrapperStyle, iconStyle, contentStyle, checkedColor: chcolor, uncheckColor: uncolor, children, disabled = false, onChange }) => {
    const [checked, setChecked] = useState(() => {
        const c = isUndefined(propsChecked) ? defaultChecked : propsChecked;
        return c !== null && c !== void 0 ? c : false;
    });
    const colors = useTheme();
    let checkedColor = chcolor ? chcolor : colors.primary;
    let uncheckColor = uncolor ? uncolor : colors.border;
    if (disabled) {
        uncheckColor = colors.disabled;
        checkedColor = colors.disabled;
    }
    useEffect(() => {
        setChecked(propsChecked !== null && propsChecked !== void 0 ? propsChecked : false);
    }, [propsChecked]);
    const handlePress = () => {
        if (disabled) {
            return;
        }
        if (isUndefined(propsChecked) && !checked) {
            setChecked(true);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange();
    };
    return (React.createElement(Pressable, { style: [
            styles.container,
            wrapperStyle,
        ], onPress: handlePress },
        React.createElement(Icon, { style: [styles.icon, iconStyle], name: checked ? 'radio-button-checked' : 'radio-button-unchecked', color: checked ? checkedColor : uncheckColor, size: 18 }),
        React.createElement(View, { style: [styles.content, contentStyle] }, isString(children)
            ? (React.createElement(Text, { style: {
                    color: disabled ? colors.disabledText : '#000000d9',
                    fontSize: 14
                } }, children))
            : children)));
};
Radio.displayName = 'Radio';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    icon: {},
    content: {
        marginLeft: 5
    }
});
