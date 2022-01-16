import React, { FC, useState, useRef, useMemo } from 'react'
import { Text, TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { PickerPanel } from '../picker-panel'
import { IAsyncTreePickerProps } from './interface'
import { isArray } from '../../utils'
import { useVisible } from '../../hooks'
import { PickerInput } from '../base'

export const AsyncTreePicker: FC<IAsyncTreePickerProps> = ({
    value: propsValue,
    depth,
    title,
    options = [],
    onChange,
    onNext,
    onPrevious,
    panelProps,
    ...restProps
}: IAsyncTreePickerProps) => {
    const [value, setValue] = useState(propsValue ?? [])
    const [visible, showPanel, hidePanel] = useVisible()
    const labels = useRef<string[]>([])
    const [activeDepth, setActiveDepth] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef<TextInput | null>(null)
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1]
    }, [activeDepth, depth])

    const handleInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        inputRef.current?.blur()
        showPanel()
        restProps.onFocus?.(e)
    }

    return (
        <>
            <PickerInput
                clearable={false}
                { ...restProps }
                value={value}
                onFocus={handleInputFocus}
                ref={inputRef}
                showSoftInputOnFocus={false}
                onClear={() => onChange?.([], [])}
            />
            <PickerPanel
                { ...panelProps }
                visible={visible}
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
                        onChange?.([...newValue], [...labels.current])
                        hidePanel()
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
                        panelProps?.onCancel?.()
                        hidePanel()
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
                            <PickerPanel.Item
                                key={val}
                                value={val}
                            >
                                <Text>{label}</Text>
                            </PickerPanel.Item>
                        )
                    })
                }
            </PickerPanel>
        </>
    )
}
