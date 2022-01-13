import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { isObject, isUndefined, isString, isFunction } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../hooks';
const { width } = Dimensions.get('window');
export const CheckList = ({ value: propsValue, defaultValue, options, activeColor: selectedColor, style, itemStyle, onChange }) => {
    const [value, setValue] = useState(() => {
        const v = isUndefined(propsValue) ? defaultValue : propsValue;
        return v !== null && v !== void 0 ? v : [];
    });
    const theme = useTheme();
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
    const renderLabel = (label, disabled, isActive) => {
        if (isString(label)) {
            return (React.createElement(Text, { style: [
                    styles.itemText,
                    isActive ? styles.activeItemText : null,
                    disabled ? { color: theme.border } : null
                ], numberOfLines: 3 }, label));
        }
        return label;
    };
    return (React.createElement(View, { style: style }, options === null || options === void 0 ? void 0 : options.map((option, index) => {
        if (isObject(option)) {
            const isActive = value.includes(option.value);
            return (React.createElement(Pressable, { key: option.value, onPress: () => handleChange(option.value, option.disabled), style: getItemStyles(isActive, index) },
                React.createElement(Icon, { name: isActive ? 'check-square' : 'square', color: isActive ? '#fff' : theme.border, size: 20, style: styles.checkIcon }),
                isFunction(option.label)
                    ? renderLabel(option.label({ isActive }), option.disabled, isActive)
                    : renderLabel(option.label, option.disabled, isActive)));
        }
        const isActive = value.includes(option);
        return (React.createElement(Pressable, { key: option, onPress: () => handleChange(option), style: getItemStyles(isActive, index) },
            React.createElement(Icon, { name: isActive ? 'check-square' : 'square', color: isActive ? '#fff' : theme.border, size: 20, style: styles.checkIcon }),
            React.createElement(Text, { style: isActive ? styles.activeItemText : null }, option)));
    })));
};
CheckList.displayName = 'CheckList';
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
