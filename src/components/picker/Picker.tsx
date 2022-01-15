import React, { FC, useEffect, useState, useRef } from 'react'
import { Text, NativeSyntheticEvent, TextInputFocusEventData, TextInput } from 'react-native'
import { PickerInput } from '../base'
import { PickerPanel } from '../picker-panel'
import { IPickerProps } from './interface'
import { useVisible } from '../../hooks'

export const Picker: FC<IPickerProps> = ({
    onChange,
    options = [],
    value: propsValue,
    panelProps,
    onVisibleChange,
    ...restProps
}: IPickerProps) => {
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange)
    const [value, setValue] = useState(propsValue ?? '')
    const inputRef = useRef<TextInput | null>(null)

    useEffect(() => {
        setValue(propsValue ?? '')
    }, [propsValue])

    const handleInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        showPanel()
        restProps.onFocus?.(e)
        inputRef.current?.blur()
    }
    const handleCancel = () => {
        hidePanel()
        panelProps?.onCancel?.()
    }
    const handleConfirm = (val: string) => {
        onChange?.(val)
        hidePanel()
    }

    return (
        <>
            <PickerInput
                { ...restProps }
                value={[value]}
                onFocus={handleInputFocus}
                showSoftInputOnFocus={false}
                ref={inputRef}
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
