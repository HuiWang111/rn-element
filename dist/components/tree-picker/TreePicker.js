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
import React, { useState, useMemo, useRef } from 'react';
import { Text } from 'react-native';
import { Picker } from '../picker';
import { getDepth, getListByDepth } from './utils';
import { isArray } from '../../utils';
const PickerItem = Picker.Item;
export const TreePicker = (_a) => {
    var { value: propsValue, options = [], title, onConfirm, onCancel } = _a, restProps = __rest(_a, ["value", "options", "title", "onConfirm", "onCancel"]);
    const [value, setValue] = useState(propsValue !== null && propsValue !== void 0 ? propsValue : []);
    const labels = useRef([]);
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
    return (React.createElement(Picker, Object.assign({}, restProps, onSearchProps, { value: value[activeDepth], title: isArray(title) ? title[activeDepth] : title, onConfirm: v => {
            var _a;
            labels.current[activeDepth] = ((_a = list.find(i => i.value === v)) === null || _a === void 0 ? void 0 : _a.label) || '';
            const newValue = [...value];
            newValue[activeDepth] = v;
            setValue(newValue);
            if (isLastDepth) {
                onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm([...newValue], [...labels.current]);
            }
            else {
                setActiveDepth(activeDepth + 1);
            }
        }, onCancel: () => {
            labels.current = labels.current.splice(activeDepth, 1);
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
        } }), list.map(item => {
        return (React.createElement(PickerItem, { value: item.value, key: item.value },
            React.createElement(Text, null, item.label)));
    })));
};
TreePicker.displayName = 'TreePicker';
