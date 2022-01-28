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
import React, { useState, useMemo, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Text } from 'react-native';
import { PickerPanel } from '../picker-panel';
import { PickerInput } from '../base';
import { getDepth, getListByDepth, getLabelsByValue } from './utils';
import { isArray, isUndefined, defaultArray, defaultFilterOption, defaultPickerLabelRender } from '../../utils';
import { useVisible } from '../../hooks';
const PickerPanelItem = PickerPanel.Item;
export const TreePicker = forwardRef((_a, ref) => {
    var _b;
    var { value: propsValue, defaultValue, options = defaultArray, title, panelProps, onChange, onVisibleChange, onFocus, labelRender = defaultPickerLabelRender, filterOption = defaultFilterOption } = _a, restProps = __rest(_a, ["value", "defaultValue", "options", "title", "panelProps", "onChange", "onVisibleChange", "onFocus", "labelRender", "filterOption"]);
    const [label, setLabel] = useState(() => {
        var _a;
        return getLabelsByValue(options, (_a = defaultValue !== null && defaultValue !== void 0 ? defaultValue : propsValue) !== null && _a !== void 0 ? _a : []);
    });
    const [panelValue, setPanelValue] = useState((_b = defaultValue !== null && defaultValue !== void 0 ? defaultValue : propsValue) !== null && _b !== void 0 ? _b : []);
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange);
    const getActiveDepth = useCallback(() => {
        if (!propsValue) {
            return 0;
        }
        else if (!propsValue.length) {
            return 0;
        }
        return propsValue.length - 1;
    }, [propsValue]);
    const [activeDepth, setActiveDepth] = useState(getActiveDepth);
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        setLabel(getLabelsByValue(options, propsValue !== null && propsValue !== void 0 ? propsValue : []));
    }, [propsValue, options]);
    useImperativeHandle(ref, () => ({
        blur() {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        },
        focus() {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        isFocused() {
            var _a;
            return ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.isFocused()) || false;
        }
    }), []);
    const depth = useMemo(() => getDepth(options), [options]);
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1];
    }, [activeDepth, depth]);
    const list = useMemo(() => {
        return getListByDepth(activeDepth, options, panelValue, filterOption, keyword);
    }, [activeDepth, options, panelValue, keyword, filterOption]);
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
    const handleInputFocus = (e) => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        showPanel();
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    };
    const handleConfirm = (v) => {
        const newValue = [...panelValue];
        newValue[activeDepth] = v;
        if (isLastDepth) {
            if (isUndefined(propsValue)) {
                setLabel(getLabelsByValue(options, newValue));
            }
            onChange === null || onChange === void 0 ? void 0 : onChange([...newValue]);
            hidePanel();
        }
        else {
            setPanelValue(newValue);
            setActiveDepth(activeDepth + 1);
        }
    };
    const handleCancel = () => {
        var _a;
        const newValue = [...panelValue];
        newValue.splice(activeDepth, 1);
        if (isFirstDepth) {
            (_a = panelProps === null || panelProps === void 0 ? void 0 : panelProps.onCancel) === null || _a === void 0 ? void 0 : _a.call(panelProps);
            hidePanel();
            setActiveDepth(getActiveDepth());
            setPanelValue(propsValue !== null && propsValue !== void 0 ? propsValue : []);
        }
        else {
            setPanelValue(newValue);
            setActiveDepth(activeDepth - 1);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(PickerInput, Object.assign({ clearable: false }, restProps, { value: labelRender(label), onFocus: handleInputFocus, ref: inputRef, showSoftInputOnFocus: false, onClear: () => onChange === null || onChange === void 0 ? void 0 : onChange([]) })),
        React.createElement(PickerPanel, Object.assign({}, panelProps, onSearchProps, { visible: visible, value: panelValue[activeDepth], title: isArray(title) ? title[activeDepth] : title, onConfirm: handleConfirm, onCancel: handleCancel, footerProps: {
                cancelText: isFirstDepth ? undefined : '上一步',
                confirmText: isLastDepth ? undefined : '下一步'
            } }), list.map(item => {
            return (React.createElement(PickerPanelItem, { value: item.value, key: item.value },
                React.createElement(Text, null, item.label)));
        }))));
});
TreePicker.displayName = 'TreePicker';
