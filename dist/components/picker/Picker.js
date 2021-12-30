import React, { Children, cloneElement, useEffect, useState, useContext, useMemo } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PickerFooter, Mask, Empty } from '../base';
import { PickerContext } from './context';
import { useArrowUp, useArrowDown } from '../../hooks';
import { omit } from '../../utils';
import { ConfigContext } from '../config-provider';
import { Input } from '../input';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const Picker = ({ zIndex = 10, maskStyle, children, value: propsValue, activeItemStyle, itemStyle, visible = false, showSearch = false, searchInputProps, fullScreen = true, footerProps = {}, onSearch, onCancel, onConfirm }) => {
    var _a, _b;
    const values = useMemo(() => {
        return Children.map(children, (item) => {
            var _a;
            return (_a = item.props) === null || _a === void 0 ? void 0 : _a.value;
        }) || [];
    }, [children]);
    const [value, setValue] = useState(propsValue !== null && propsValue !== void 0 ? propsValue : ((_a = values[0]) !== null && _a !== void 0 ? _a : ''));
    const [keyword, setKeyword] = useState('');
    const { showSoftInputOnFocus } = useContext(ConfigContext);
    const containerWidth = useMemo(() => {
        return fullScreen ? screenWidth : screenWidth - 40;
    }, [fullScreen]);
    const containerHeight = useMemo(() => {
        return fullScreen ? screenHeight - 20 : screenHeight - 90;
    }, [fullScreen]);
    const scrollViewStyle = {
        height: containerHeight - 50
    };
    if (showSearch) {
        scrollViewStyle.height -= 50;
    }
    useEffect(() => {
        var _a;
        setValue(propsValue !== null && propsValue !== void 0 ? propsValue : ((_a = values[0]) !== null && _a !== void 0 ? _a : ''));
    }, [propsValue, values]);
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
        onSearch === null || onSearch === void 0 ? void 0 : onSearch('');
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
    const renderItems = () => {
        if (Children.count(children) === 0) {
            return React.createElement(Empty, { style: { height: scrollViewStyle.height } });
        }
        return (React.createElement(PickerContext.Provider, { value: { setValue, activeItemStyle, itemStyle } }, Children.map(children, (item) => {
            var _a;
            return cloneElement(item, {
                isActive: value === ((_a = item.props) === null || _a === void 0 ? void 0 : _a.value)
            });
        })));
    };
    return (React.createElement(Mask, { zIndex: zIndex, style: maskStyle, visible: visible },
        React.createElement(View, { style: [
                styles.container,
                {
                    width: containerWidth,
                    height: containerHeight
                }
            ] },
            showSearch
                ? (React.createElement(View, { style: styles.searchContainer },
                    React.createElement(Input, Object.assign({}, omit(searchInputProps, ['value', 'onChangeText']), { value: keyword, style: styles.searchInput, wrapStyle: styles.searchInputWrap, onChangeText: handleKeywordChange, showSoftInputOnFocus: (_b = searchInputProps === null || searchInputProps === void 0 ? void 0 : searchInputProps.showSoftInputOnFocus) !== null && _b !== void 0 ? _b : showSoftInputOnFocus }))))
                : null,
            React.createElement(ScrollView, { style: scrollViewStyle }, renderItems()),
            React.createElement(PickerFooter, Object.assign({ onCancel: handleCancel, onConfirm: handleConfirm }, footerProps)))));
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    searchContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    searchInput: {
        height: 30,
        padding: 0
    },
    searchInputWrap: {
        height: 30
    }
});
