import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { Text, NativeSyntheticEvent, TextInputFocusEventData, TextInput } from 'react-native'
import { PickerInput } from '../base'
import { PickerPanel } from '../picker-panel'
import { IPickerProps } from './interface'
import { useVisible } from '../../hooks'
import { isUndefined } from '../../utils'

export const Picker: FC<IPickerProps> = ({
    options = [],
    value: propsValue,
    defaultValue,
    panelProps,
    onChange,
    onVisibleChange,
    onFocus,
    ...restProps
}: IPickerProps) => {
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange)
    const [value, setValue] = useState(defaultValue ?? propsValue ?? '')
    const inputRef = useRef<TextInput | null>(null)
    const label = useMemo<string[]>(() => {
        if (!value) {
            return []
        }

        const l = options.find(o => o.value === value)?.label ?? value
        return [l]
    }, [value, options])

    useEffect(() => {
        setValue(propsValue ?? '')
    }, [propsValue])

    const handleInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        inputRef.current?.blur()
        showPanel()
        onFocus?.(e)
    }
    const handleCancel = () => {
        hidePanel()
        panelProps?.onCancel?.()
    }
    const handleConfirm = (val: string) => {
        if (isUndefined(propsValue)) {
            setValue(val)
        }
        onChange?.(val)
        hidePanel()
    }

    return (
        <>
            <PickerInput
                clearable={false}
                { ...restProps }
                value={label}
                onFocus={handleInputFocus}
                showSoftInputOnFocus={false}
                ref={inputRef}
                onClear={() => onChange?.('')}
            />
            <PickerPanel
                { ...panelProps }
                visible={visible}
                onConfirm={handleConfirm}
                value={value}
                onCancel={handleCancel}
            >
                {
                    options.map(({ value, label }) => {
                        return (
                            <PickerPanel.Item key={value} value={value}>
                                <Text>{label}</Text>
                            </PickerPanel.Item>
                        )
                    })
                }
            </PickerPanel>
        </>
    )
}

Picker.displayName = 'Picker'
