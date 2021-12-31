import React, { Children, useState, useEffect, cloneElement, isValidElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { isUndefined } from '../../utils';
export const BaseGroup = ({ defaultValue, value: propsValue, disabled = false, children, style, onChange }) => {
    const [value, setValue] = useState(propsValue !== null && propsValue !== void 0 ? propsValue : (defaultValue !== null && defaultValue !== void 0 ? defaultValue : []));
    useEffect(() => {
        setValue(propsValue !== null && propsValue !== void 0 ? propsValue : []);
    }, [propsValue]);
    const handleChange = (v, checked) => {
        let newValue;
        if (isUndefined(checked)) {
            newValue = [v];
        }
        else {
            newValue = checked ? [...value, v] : value.filter(i => v !== i);
        }
        if (isUndefined(propsValue)) {
            setValue(newValue);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    return (React.createElement(View, { style: [styles.container, style] }, Children.map(children, c => {
        var _a;
        if (isValidElement(c)) {
            return cloneElement(c, {
                checked: value.includes(c.props.value),
                disabled: (_a = c.props.disabled) !== null && _a !== void 0 ? _a : disabled,
                onChange: (checked) => handleChange(c.props.value, checked),
                wrapperStyle: Object.assign(Object.assign({}, c.props.wrapperStyle), { marginRight: 8 })
            });
        }
        return c;
    })));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});
