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
import React, { useState, useRef, useMemo } from 'react';
import { Text } from 'react-native';
import { Picker } from '../picker';
import { isArray } from '../../utils';
export const AsyncTreePicker = (_a) => {
    var { value: propsValue, depth, title, options = [], onConfirm, onNext, onPrevious, onCancel } = _a, restProps = __rest(_a, ["value", "depth", "title", "options", "onConfirm", "onNext", "onPrevious", "onCancel"]);
    const [value, setValue] = useState(propsValue !== null && propsValue !== void 0 ? propsValue : []);
    const labels = useRef([]);
    const [activeDepth, setActiveDepth] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1];
    }, [activeDepth, depth]);
    return (React.createElement(Picker, Object.assign({}, restProps, { value: value[activeDepth], title: isArray(title) ? title[activeDepth] : title, onConfirm: (v) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            if (loading) {
                return;
            }
            labels.current[activeDepth] = ((_b = options.find(i => i.value === v)) === null || _b === void 0 ? void 0 : _b.label) || '';
            const newValue = [...value];
            newValue[activeDepth] = v;
            setValue(newValue);
            const newActiveDepth = activeDepth + 1;
            if (isLastDepth) {
                onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm([...newValue], [...labels.current]);
            }
            else {
                setLoading(true);
                yield (onNext === null || onNext === void 0 ? void 0 : onNext(v, newActiveDepth, newValue));
                setLoading(false);
                setActiveDepth(newActiveDepth);
            }
        }), onCancel: () => __awaiter(void 0, void 0, void 0, function* () {
            if (loading) {
                return;
            }
            labels.current = labels.current.splice(activeDepth, 1);
            const newValue = [...value];
            newValue.splice(activeDepth, 1);
            setValue(newValue);
            const newActiveDepth = activeDepth - 1;
            if (isFirstDepth) {
                onCancel === null || onCancel === void 0 ? void 0 : onCancel();
            }
            else {
                setLoading(true);
                yield (onPrevious === null || onPrevious === void 0 ? void 0 : onPrevious(newActiveDepth));
                setLoading(false);
                setActiveDepth(newActiveDepth);
            }
        }), footerProps: {
            cancelText: isFirstDepth ? undefined : '上一步',
            confirmText: isLastDepth ? undefined : '下一步'
        } }), options.map(option => {
        const { label, value: val } = option;
        return (React.createElement(Picker.Item, { key: val, value: val },
            React.createElement(Text, null, label)));
    })));
};
