import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { isObject, colors } from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
const { width } = Dimensions.get('window');
export const RadioList = ({ value: propsValue, options, activeColor = colors.success, onChange }) => {
    const [value, setValue] = useState(propsValue);
    useEffect(() => {
        setValue(propsValue);
    }, [propsValue]);
    const handleChange = (pressedValue, disabled = false) => {
        if (!disabled && value !== pressedValue) {
            onChange === null || onChange === void 0 ? void 0 : onChange(pressedValue);
        }
    };
    return (React.createElement(View, null, options === null || options === void 0 ? void 0 : options.map((option, index) => {
        if (isObject(option)) {
            const isActive = option.value === value;
            return (React.createElement(Pressable, { key: option.value, onPress: () => handleChange(option.value, option.disabled), style: [
                    styles.item,
                    isActive && activeColor ? { backgroundColor: activeColor } : null,
                    index > 0 ? { borderTopWidth: 0 } : null
                ] },
                React.createElement(Icon, { name: 'check', color: '#fff', size: 20, style: styles.checkIcon }),
                React.createElement(Text, { style: [
                        styles.itemText,
                        isActive ? styles.activeItemText : null,
                        option.disabled ? styles.disabledItemText : null
                    ], numberOfLines: 3 }, option.label)));
        }
        const isActive = option === value;
        return (React.createElement(Pressable, { key: option, onPress: () => handleChange(option), style: [
                styles.item,
                isActive && activeColor ? { backgroundColor: activeColor } : null,
                index > 0 ? { borderTopWidth: 0 } : null
            ] },
            React.createElement(Icon, { name: 'check', color: '#fff', size: 20, style: styles.checkIcon }),
            React.createElement(Text, { style: isActive ? styles.activeItemText : null }, option)));
    })));
};
const styles = StyleSheet.create({
    list: {
        width,
        height: '100%'
    },
    item: {
        width,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: colors.border,
        borderWidth: 1,
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
    },
    disabledItemText: {
        color: colors.border
    }
});
