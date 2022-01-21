import { useState, Dispatch, SetStateAction, useCallback } from 'react'
import { isFunction, isUndefined } from '../utils'

export const useMergedState = <S>(
    state?: S | (() => S),
    options?: {
        defaultValue?: S,
        defaultTypeValue?: S,
        onChange?: (v: S | undefined) => void,
    }
): [S | undefined, Dispatch<SetStateAction<S>>, (val: S, p?: S) => void] => {
    const { defaultValue, onChange, defaultTypeValue } = options || {}
    const [value, setValue] = useState<S | undefined>(() => {
        const val = isFunction(state) ? state() : state
        return isUndefined(val)
            ? (defaultValue ?? defaultTypeValue)
            : val
    })

    const setValueWithOnChange = useCallback<(val: S, p?: S) => void>((val: S, propsValue?: S) => {
        /**
         * 非受控组件需要调用setValue强制更新状态
         * 受控组件只调用onChange向外触发value
         */
        if (isUndefined(propsValue)) {
            setValue(val)
        }
        onChange?.(val)
    }, [setValue, onChange])

    return [
        value,
        setValue,
        setValueWithOnChange
    ]
}
