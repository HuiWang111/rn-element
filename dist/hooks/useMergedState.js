import { useState, useCallback } from 'react';
import { isFunction, isUndefined } from '../utils';
export const useMergedState = (state, options) => {
    const { defaultValue, onChange, defaultTypeValue } = options || {};
    const [value, setValue] = useState(() => {
        const val = isFunction(state) ? state() : state;
        return isUndefined(val)
            ? (defaultValue !== null && defaultValue !== void 0 ? defaultValue : defaultTypeValue)
            : val;
    });
    const setValueWithOnChange = useCallback((val, propsValue) => {
        if (isUndefined(propsValue)) {
            setValue(val);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(val);
    }, [setValue, onChange]);
    return [
        value,
        setValue,
        setValueWithOnChange
    ];
};
