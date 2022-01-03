import React, { FC, useState, useRef, useMemo } from 'react'
import { Text } from 'react-native'
import { Picker } from '../picker'
import { IAsyncTreePickerProps } from './interface'
import { isArray } from '../../utils'

export const AsyncTreePicker: FC<IAsyncTreePickerProps> = ({
    value: propsValue,
    depth,
    title,
    options = [],
    onConfirm,
    onNext,
    onPrevious,
    onCancel,
    ...restProps
}: IAsyncTreePickerProps) => {
    const [value, setValue] = useState(propsValue ?? [])
    const labels = useRef<string[]>([])
    const [activeDepth, setActiveDepth] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1]
    }, [activeDepth, depth])

    return (
        <Picker
            { ...restProps }
            value={value[activeDepth]}
            title={isArray(title) ? title[activeDepth] : title}
            onConfirm={async v => {
                if (loading) {
                    return
                }

                labels.current[activeDepth] = options.find(i => i.value === v)?.label || ''

                const newValue = [...value]
                newValue[activeDepth] = v
                setValue(newValue)

                const newActiveDepth = activeDepth + 1

                if (isLastDepth) {
                    onConfirm?.([...newValue], [...labels.current])
                } else {
                    setLoading(true)
                    await onNext?.(v, newActiveDepth, newValue)
                    setLoading(false)
                    setActiveDepth(newActiveDepth)
                }
            }}
            onCancel={async () => {
                if (loading) {
                    return
                }

                labels.current = labels.current.splice(activeDepth, 1)

                const newValue = [...value]
                newValue.splice(activeDepth, 1)
                setValue(newValue)

                const newActiveDepth = activeDepth - 1

                if (isFirstDepth) {
                    onCancel?.()
                } else {
                    setLoading(true)
                    await onPrevious?.(newActiveDepth)
                    setLoading(false) 
                    setActiveDepth(newActiveDepth)
                }
            }}
            footerProps={{
                cancelText: isFirstDepth ? undefined : '上一步',
                confirmText: isLastDepth ? undefined : '下一步'
            }}
        >
            {
                options.map(option => {
                    const { label, value: val } = option

                    return (
                        <Picker.Item
                            key={val}
                            value={val}
                        >
                            <Text>{label}</Text>
                        </Picker.Item>
                    )
                })
            }
        </Picker>
    )
}
