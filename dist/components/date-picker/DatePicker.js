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
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/AntDesign';
import { PickerInput } from '../base';
import { useMergedState, useVisible } from '../../hooks';
import { DatePickerPanel } from './DatePickerPanel';
import { wait } from '../../utils';
export const DatePicker = forwardRef((_a, ref) => {
    var { value: propsValue, defaultValue, format = 'YYYY-MM-DD', panelProps, onChange, onVisibleChange, onFocus } = _a, restProps = __rest(_a, ["value", "defaultValue", "format", "panelProps", "onChange", "onVisibleChange", "onFocus"]);
    const inputRef = useRef(null);
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange);
    const [value, setValue, setValueWithOnChange] = useMergedState(propsValue, {
        defaultValue,
        onChange
    });
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
    useEffect(() => {
        setValue(propsValue);
    }, [propsValue, setValue]);
    const handleFocus = (e) => {
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
    const handleConfirm = () => __awaiter(void 0, void 0, void 0, function* () {
        setValueWithOnChange(dayjs(), propsValue);
        yield wait(100);
        hidePanel();
    });
    const handleDateChange = (date) => __awaiter(void 0, void 0, void 0, function* () {
        const d = value !== null && value !== void 0 ? value : dayjs();
        const newDate = d.set('date', date);
        setValueWithOnChange(newDate, propsValue);
        yield wait(100);
        hidePanel();
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(PickerInput, Object.assign({ clearable: false }, restProps, { ref: inputRef, showSoftInputOnFocus: false, value: value ? value.format(format) : '', onClear: () => onChange === null || onChange === void 0 ? void 0 : onChange(undefined), rightIcon: React.createElement(Icon, { name: 'calendar' }), onFocus: handleFocus })),
        React.createElement(DatePickerPanel, { visible: visible, value: propsValue, onCancel: handleCancel, onConfirm: handleConfirm, onDateChange: handleDateChange })));
});
