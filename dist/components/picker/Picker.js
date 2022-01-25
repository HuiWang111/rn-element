var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Text } from 'react-native';
import { PickerInput } from '../base';
import { PickerPanel } from '../picker-panel';
import { useVisible } from '../../hooks';
import { isUndefined } from '../../utils';
export const Picker = (_a) => {
    var _b;
    var { options = [], value: propsValue, defaultValue, panelProps, onChange, onVisibleChange, onFocus, filterOption = (k, o) => o.label.includes(k) } = _a, restProps = __rest(_a, ["options", "value", "defaultValue", "panelProps", "onChange", "onVisibleChange", "onFocus", "filterOption"]);
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange);
    const [value, setValue] = useState((_b = defaultValue !== null && defaultValue !== void 0 ? defaultValue : propsValue) !== null && _b !== void 0 ? _b : '');
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef(null);
    const label = useMemo(() => {
        var _a, _b;
        if (!value) {
            return '';
        }
        return (_b = (_a = options.find(o => o.value === value)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : value;
    }, [value, options]);
    const onSearchProps = useMemo(() => {
        if (!(panelProps === null || panelProps === void 0 ? void 0 : panelProps.showSearch)) {
            return {};
        }
        return {
            onSearch: (val) => {
                setKeyword(val);
            }
        };
    }, [panelProps === null || panelProps === void 0 ? void 0 : panelProps.showSearch]);
    const filteredList = useMemo(() => {
        if (!keyword) {
            return options;
        }
        return options.filter(item => filterOption(keyword, item));
    }, [options, keyword, filterOption]);
    useEffect(() => {
        setValue(propsValue !== null && propsValue !== void 0 ? propsValue : '');
    }, [propsValue]);
    const handleInputFocus = (e) => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        showPanel();
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    };
    const handleCancel = () => {
        var _a;
        hidePanel();
        (_a = panelProps === null || panelProps === void 0 ? void 0 : panelProps.onCancel) === null || _a === void 0 ? void 0 : _a.call(panelProps);
    };
    const handleConfirm = (val) => {
        if (isUndefined(propsValue)) {
            setValue(val);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(val);
        hidePanel();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(PickerInput, Object.assign({ clearable: false }, restProps, { value: label, onFocus: handleInputFocus, showSoftInputOnFocus: false, ref: inputRef, onClear: () => onChange === null || onChange === void 0 ? void 0 : onChange('') })),
        React.createElement(PickerPanel, Object.assign({}, panelProps, onSearchProps, { visible: visible, onConfirm: handleConfirm, value: value, onCancel: handleCancel }), filteredList.map(({ value, label }) => {
            return (React.createElement(PickerPanel.Item, { key: value, value: value },
                React.createElement(Text, null, label)));
        }))));
};
Picker.displayName = 'Picker';
