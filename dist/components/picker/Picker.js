import React, { Children, cloneElement, useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Mask } from '../base/Mask';
import { PickerFooter } from '../base/PickerFooter';
import { PickerContext } from './context';
import { useArrowUp, useArrowDown } from '../../hooks';
import { omit } from '../../utils';
import { ConfigContext } from '../config-provider';
import { Input } from '../input';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const containerWidth = screenWidth - 40;
const containerHeight = screenHeight - 90;
export const Picker = ({ zIndex, maskStyle, children, value: propsValue, activeItemStyle, itemStyle, visible = false, showSearch = false, searchInputProps, onSearch, onCancel, onConfirm }) => {
    var _a;
    const values = Children.map(children, (item) => {
        var _a;
        return (_a = item.props) === null || _a === void 0 ? void 0 : _a.value;
    }) || [];
    const [value, setValue] = useState(values[0] || '');
    const [keyword, setKeyword] = useState('');
    const { showSoftInputOnFocus } = useContext(ConfigContext);
    const scrollViewStyle = {
        height: containerHeight - 50
    };
    if (showSearch) {
        scrollViewStyle.height -= 50;
    }
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
    const resetState = () => {
        setValue(values[0] || '');
        setKeyword('');
    };
    const handleConfirm = () => {
        onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(value);
        resetState();
    };
    const handleCancel = () => {
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
        resetState();
    };
    const handleKeywordChange = (value) => {
        setKeyword(value);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(value);
    };
    return (React.createElement(Mask, { zIndex: zIndex, style: maskStyle, visible: visible },
        React.createElement(View, { style: styles.container },
            showSearch
                ? React.createElement(View, { style: styles.searchContainer },
                    React.createElement(Input, Object.assign({}, omit(searchInputProps, ['value', 'onChangeText']), { value: keyword, onChangeText: handleKeywordChange, showSoftInputOnFocus: (_a = searchInputProps === null || searchInputProps === void 0 ? void 0 : searchInputProps.showSoftInputOnFocus) !== null && _a !== void 0 ? _a : showSoftInputOnFocus })))
                : null,
            React.createElement(ScrollView, { style: scrollViewStyle },
                React.createElement(PickerContext.Provider, { value: { setValue, activeItemStyle, itemStyle } }, Children.map(children, (item) => {
                    var _a;
                    return cloneElement(item, {
                        isActive: value === ((_a = item.props) === null || _a === void 0 ? void 0 : _a.value)
                    });
                }))),
            React.createElement(PickerFooter, { onCancel: handleCancel, onConfirm: handleConfirm }))));
};
const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#fff'
    },
    searchContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
