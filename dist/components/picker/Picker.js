import React, { Children, cloneElement, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Mask } from './Mask';
import { PickerFooter } from './PickerFooter';
import { PickerContext } from './context';
import { useArrowUp, useArrowDown } from '../../hooks';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const Picker = ({ zIndex, maskStyle, children, value: propsValue, activeItemStyle, itemStyle, onCancel, onConfirm }) => {
    const values = Children.map(children, (child) => {
        var _a;
        return (_a = child.props) === null || _a === void 0 ? void 0 : _a.value;
    }) || [];
    const [value, setValue] = useState(values[0] || '');
    useEffect(() => {
        setValue(propsValue || '');
    }, [propsValue]);
    useArrowUp(() => {
        const index = values.findIndex(v => v === value);
        if (index > 0) {
            setValue(values[index - 1]);
        }
    }, [value]);
    useArrowDown(() => {
        const index = values.findIndex(v => v === value);
        const maxIndex = values.length - 1;
        if (index < maxIndex) {
            setValue(values[index + 1]);
        }
    }, [value]);
    const handleConfirm = () => {
        onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(value);
    };
    return (React.createElement(Mask, { zIndex: zIndex, style: maskStyle },
        React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, { style: styles.picker },
                React.createElement(PickerContext.Provider, { value: { setValue, activeItemStyle, itemStyle } }, Children.map(children, (child) => {
                    var _a;
                    return cloneElement(child, {
                        isActive: value === ((_a = child.props) === null || _a === void 0 ? void 0 : _a.value)
                    });
                }))),
            React.createElement(PickerFooter, { onCancel: onCancel, onConfirm: handleConfirm }))));
};
const containerWidth = screenWidth - 40;
const containerHeight = screenHeight - 70;
const styles = StyleSheet.create({
    container: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { width: containerWidth, height: containerHeight, left: 20, top: 20, right: 20, bottom: 20, backgroundColor: '#fff' }),
    picker: {
        height: containerHeight - 60
    }
});
