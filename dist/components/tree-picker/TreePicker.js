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
import React, { useState, useMemo } from 'react';
import { Text } from 'react-native';
import { Picker } from '../picker';
import { getDepth, getListByDepth } from './utils';
const PickerItem = Picker.Item;
export const TreePicker = (_a) => {
    var { value: propsValue, options = [], onConfirm, onCancel } = _a, restProps = __rest(_a, ["value", "options", "onConfirm", "onCancel"]);
    const [value, setValue] = useState(propsValue !== null && propsValue !== void 0 ? propsValue : []);
    const [activeDepth, setActiveDepth] = useState(0);
    const [keyword, setKeyword] = useState('');
    const depth = useMemo(() => getDepth(options), [options]);
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1];
    }, [activeDepth, depth]);
    const list = useMemo(() => {
        return getListByDepth(activeDepth, options, value, keyword);
    }, [activeDepth, options, value, keyword]);
    const onSearchProps = useMemo(() => {
        if (!restProps.showSearch) {
            return {};
        }
        return {
            onSearch: (val) => {
                setKeyword(val);
            }
        };
    }, [restProps.showSearch]);
    return (React.createElement(Picker, Object.assign({ value: value[activeDepth], onConfirm: v => {
            const newValue = [...value];
            newValue[activeDepth] = v;
            setValue(newValue);
            if (isLastDepth) {
                onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm([...newValue]);
            }
            else {
                setActiveDepth(activeDepth + 1);
            }
        }, onCancel: () => {
            const newValue = [...value];
            newValue.splice(activeDepth, 1);
            setValue(newValue);
            if (isFirstDepth) {
                onCancel === null || onCancel === void 0 ? void 0 : onCancel();
            }
            else {
                setActiveDepth(activeDepth - 1);
            }
        }, footerProps: {
            cancelText: isFirstDepth ? undefined : '上一步',
            confirmText: isLastDepth ? undefined : '下一步'
        } }, restProps, onSearchProps), list.map(item => {
        return (React.createElement(PickerItem, { value: item.value, key: item.value },
            React.createElement(Text, null, item.label)));
    })));
};
