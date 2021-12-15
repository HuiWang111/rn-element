import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { isObject, isUndefined, isString } from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../theme-provider';
const { width } = Dimensions.get('window');
export const CheckList = ({ value: propsValue, defaultValue, options, activeColor: selectedColor, style, itemStyle, onChange }) => {
    const [value, setValue] = useState(() => {
        const v = isUndefined(propsValue) ? defaultValue : propsValue;
        return v !== null && v !== void 0 ? v : [];
    });
    const theme = useContext(ThemeContext);
    const activeColor = selectedColor || theme.primary;
    useEffect(() => {
        setValue(propsValue !== null && propsValue !== void 0 ? propsValue : []);
    }, [propsValue]);
    const handleChange = (pressedValue, disabled = false) => {
        if (disabled) {
            return;
        }
        let newValue;
        if (value.includes(pressedValue)) {
            newValue = value.filter(v => v !== pressedValue);
        }
        else {
            newValue = [...value, pressedValue];
        }
        if (isUndefined(propsValue)) {
            setValue(newValue);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    const getItemStyles = (isActive, index) => {
        return [
            styles.item,
            { borderTopColor: theme.border },
            isActive && activeColor ? { backgroundColor: activeColor } : null,
            index === 0 ? { borderTopWidth: 0 } : null,
            itemStyle
        ];
    };
    return (React.createElement(View, { style: style }, options === null || options === void 0 ? void 0 : options.map((option, index) => {
        if (isObject(option)) {
            const isActive = value.includes(option.value);
            return (React.createElement(Pressable, { key: option.value, onPress: () => handleChange(option.value, option.disabled), style: getItemStyles(isActive, index) },
                React.createElement(Icon, { name: 'check', color: '#fff', size: 20, style: styles.checkIcon }),
                isString(option.label) ? (React.createElement(Text, { style: [
                        styles.itemText,
                        isActive ? styles.activeItemText : null,
                        option.disabled ? { color: theme.border } : null
                    ], numberOfLines: 3 }, option.label)) : option.label));
        }
        const isActive = value.includes(option);
        return (React.createElement(Pressable, { key: option, onPress: () => handleChange(option), style: getItemStyles(isActive, index) },
            React.createElement(Icon, { name: 'check', color: '#fff', size: 20, style: styles.checkIcon }),
            React.createElement(Text, { style: isActive ? styles.activeItemText : null }, option)));
    })));
};
const styles = StyleSheet.create({
    item: {
        width,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        position: 'relative',
        alignItems: 'center'
    },
    itemText: {
        width: width - 40
    },
    activeItemText: {
        color: '#fff'
    },
    checkIcon: {
        marginRight: 10
    }
});
