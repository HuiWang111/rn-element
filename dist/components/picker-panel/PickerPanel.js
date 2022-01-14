import React, { Children, cloneElement, useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { RootSiblingPortal } from 'react-native-root-siblings';
import { PickerFooter, Mask, Empty } from '../base';
import { PickerContext } from './context';
import { useArrowUp, useArrowDown, useTheme, useConfig } from '../../hooks';
import { isNumber, isString, omit } from '../../utils';
import { Input } from '../input';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const baseHeaderHeight = 40;
export const PickerPanel = ({ title, headerStyle, zIndex = 10, maskStyle, children, value: propsValue, activeItemStyle, itemStyle, visible = false, showSearch = false, searchInputProps, fullScreen = true, footerProps = {}, confirmOnSelect = false, onSearch, onCancel, onConfirm }) => {
    var _a, _b;
    const theme = useTheme();
    const values = useMemo(() => {
        return Children.map(children, (item) => {
            var _a;
            return (_a = item.props) === null || _a === void 0 ? void 0 : _a.value;
        }) || [];
    }, [children]);
    const [value, setValue] = useState(propsValue !== null && propsValue !== void 0 ? propsValue : ((_a = values[0]) !== null && _a !== void 0 ? _a : ''));
    const [keyword, setKeyword] = useState('');
    const { showSoftInputOnFocus } = useConfig();
    const containerWidth = useMemo(() => {
        return fullScreen ? screenWidth : screenWidth - 40;
    }, [fullScreen]);
    const containerHeight = useMemo(() => {
        return fullScreen ? screenHeight - 20 : screenHeight - 90;
    }, [fullScreen]);
    const headerHeight = useMemo(() => {
        if (!title) {
            return 0;
        }
        if (headerStyle && ('height' in headerStyle) && isNumber(headerStyle.height)) {
            return headerStyle.height;
        }
        return baseHeaderHeight;
    }, [title, headerStyle]);
    const scrollViewStyle = useMemo(() => {
        const style = {
            height: containerHeight - 50 - headerHeight
        };
        if (showSearch) {
            style.height -= 50;
        }
        return style;
    }, [showSearch, containerHeight, headerHeight]);
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
        return (React.createElement(PickerContext.Provider, { value: { setValue, activeItemStyle, itemStyle, confirmOnSelect, onConfirm } }, Children.map(children, (item) => {
            var _a;
            return cloneElement(item, {
                isActive: value === ((_a = item.props) === null || _a === void 0 ? void 0 : _a.value)
            });
        })));
    };
    return (React.createElement(RootSiblingPortal, null,
        React.createElement(Mask, { zIndex: zIndex, style: maskStyle, visible: visible },
            React.createElement(View, { style: [
                    styles.container,
                    {
                        width: containerWidth,
                        height: containerHeight
                    }
                ] },
                title ? (React.createElement(View, { style: [
                        styles.header,
                        {
                            borderBottomColor: theme.border,
                            borderBottomWidth: showSearch ? 1 : 0
                        },
                        headerStyle
                    ] }, isString(title) ? (React.createElement(Text, { style: styles.title }, title)) : title)) : null,
                showSearch
                    ? (React.createElement(View, { style: styles.searchContainer },
                        React.createElement(Input, Object.assign({}, omit(searchInputProps, ['value', 'onChangeText']), { value: keyword, style: styles.searchInput, wrapStyle: styles.searchInputWrap, onChangeText: handleKeywordChange, showSoftInputOnFocus: (_b = searchInputProps === null || searchInputProps === void 0 ? void 0 : searchInputProps.showSoftInputOnFocus) !== null && _b !== void 0 ? _b : showSoftInputOnFocus }))))
                    : null,
                React.createElement(ScrollView, { style: scrollViewStyle }, renderItems()),
                React.createElement(PickerFooter, Object.assign({ onCancel: handleCancel, onConfirm: handleConfirm }, footerProps))))));
};
PickerPanel.displayName = 'PickerPanel';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    header: {
        height: baseHeaderHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    searchInput: {
        height: 30,
        padding: 0
    },
    searchInputWrap: {
        height: 30
    }
});
