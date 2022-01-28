var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import React, { useState, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Text } from 'react-native';
import { PickerPanel } from '../picker-panel';
import { isArray, defaultArray, defaultFilterOption, defaultPickerLabelRender } from '../../utils';
import { useVisible } from '../../hooks';
import { PickerInput } from '../base';
export const AsyncTreePicker = forwardRef((_a, ref) => {
    var _b, _c;
    var { value: propsValue, defaultValue, depth, title, options = defaultArray, panelProps, onChange, onNext, onPrevious, onFocus, labelRender = defaultPickerLabelRender, filterOption = defaultFilterOption } = _a, restProps = __rest(_a, ["value", "defaultValue", "depth", "title", "options", "panelProps", "onChange", "onNext", "onPrevious", "onFocus", "labelRender", "filterOption"]);
    const [labels, setLabels] = useState((_b = defaultValue !== null && defaultValue !== void 0 ? defaultValue : propsValue) !== null && _b !== void 0 ? _b : []);
    const [panelValue, setPanelValue] = useState((_c = defaultValue !== null && defaultValue !== void 0 ? defaultValue : propsValue) !== null && _c !== void 0 ? _c : []);
    const [visible, showPanel, hidePanel] = useVisible();
    const [activeDepth, setActiveDepth] = useState(0);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1];
    }, [activeDepth, depth]);
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
    const handleInputFocus = (e) => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        showPanel();
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    };
    const handleConfirm = (v) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e;
        if (loading) {
            return;
        }
        const newValue = [...panelValue];
        newValue[activeDepth] = v;
        const newActiveDepth = activeDepth + 1;
        const newLabels = [...labels];
        newLabels[activeDepth] = (_e = (_d = options.find(o => o.value === v)) === null || _d === void 0 ? void 0 : _d.label) !== null && _e !== void 0 ? _e : v;
        setLabels(newLabels);
        if (isLastDepth) {
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
            hidePanel();
        }
        else {
            setLoading(true);
            setPanelValue(newValue);
            yield (onNext === null || onNext === void 0 ? void 0 : onNext(v, newActiveDepth, newValue));
            setActiveDepth(newActiveDepth);
            setLoading(false);
        }
    });
    const handleCancel = () => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        if (loading) {
            return;
        }
        const newValue = [...panelValue];
        newValue.splice(activeDepth, 1);
        const newActiveDepth = activeDepth - 1;
        if (isFirstDepth) {
            (_f = panelProps === null || panelProps === void 0 ? void 0 : panelProps.onCancel) === null || _f === void 0 ? void 0 : _f.call(panelProps);
            hidePanel();
        }
        else {
            setPanelValue(newValue);
            setLoading(true);
            yield (onPrevious === null || onPrevious === void 0 ? void 0 : onPrevious(newActiveDepth));
            setLoading(false);
            setActiveDepth(newActiveDepth);
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(PickerInput, Object.assign({ clearable: false }, restProps, { value: labelRender(labels), onFocus: handleInputFocus, ref: inputRef, showSoftInputOnFocus: false, onClear: () => onChange === null || onChange === void 0 ? void 0 : onChange([]) })),
        React.createElement(PickerPanel, Object.assign({}, panelProps, onSearchProps, { visible: visible, value: panelValue[activeDepth], title: isArray(title) ? title[activeDepth] : title, onConfirm: handleConfirm, onCancel: handleCancel, footerProps: {
                cancelText: isFirstDepth ? undefined : '上一步',
                confirmText: isLastDepth ? undefined : '下一步'
            } }), filteredList.map(option => {
            const { label, value: val } = option;
            return (React.createElement(PickerPanel.Item, { key: val, value: val },
                React.createElement(Text, null, label)));
        }))));
});
AsyncTreePicker.displayName = 'AsyncTreePicker';
