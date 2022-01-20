import { useState, Dispatch, SetStateAction } from 'react'
import { isFunction, isUndefined } from '../utils'

export const useMergedState = <S>(
    state?: S | (() => S),
    options?: {
        defaultValue?: S,
        defaultTypeValue?: S,
        onChange?: (v: S | undefined) => void,
    }
): [S | undefined, Dispatch<SetStateAction<S>>, Dispatch<SetStateAction<S>>] => {
    const { defaultValue, onChange, defaultTypeValue } = options || {}
    const [value, setValue] = useState<S | undefined>(() => {
        const val = isFunction(state) ? state() : state
        return isUndefined(val)
            ? (defaultValue ?? defaultTypeValue)
            : val
    })

    return [
        value,
        setValue,
        (val: S, propsValue?: S) => {
            /**
             * 非受控组件需要调用setValue强制更新状态
             * 受控组件只调用onChange向外触发value
             */
            if (isUndefined(propsValue)) {
                setValue(val)
            }
            onChange?.(val)
        }
    ]
}
