import React, { FC, useEffect, useState, useRef, useMemo, forwardRef, useImperativeHandle, RefAttributes, ForwardedRef } from 'react'
import { Text, NativeSyntheticEvent, TextInputFocusEventData, TextInput } from 'react-native'
import { PickerInput, IPickerRef } from '../base'
import { PickerPanel } from '../picker-panel'
import { IPickerProps, IOnSearchProps } from './interface'
import { useVisible } from '../../hooks'
import { isUndefined, defaultFilterOption, defaultArray } from '../../utils'
import { IOption } from '../tree-picker/interface'

export const Picker: FC<IPickerProps & RefAttributes<IPickerRef>> = forwardRef(({
    options = defaultArray,
    value: propsValue,
    defaultValue,
    panelProps,
    onChange,
    onVisibleChange,
    onFocus,
    filterOption = defaultFilterOption,
    ...restProps
}: IPickerProps, ref: ForwardedRef<IPickerRef>) => {
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange)
    const [value, setValue] = useState(defaultValue ?? propsValue ?? '')
    const [keyword, setKeyword] = useState<string>('')
    const inputRef = useRef<TextInput | null>(null)
    const label = useMemo<string>(() => {
        if (!value) {
            return ''
        }
        return options.find(o => o.value === value)?.label ?? value
    }, [value, options])
    const onSearchProps = useMemo<IOnSearchProps>(() => {
        if (!panelProps?.showSearch) {
            return {}
        }

        return {
            onSearch: (val) => {
                setKeyword(val)
            }
        }
    }, [panelProps?.showSearch])
    const filteredList = useMemo<IOption[]>(() => {
        if (!keyword) {
            return options
        }

        return options.filter(item => filterOption(keyword, item))
    }, [options, keyword, filterOption])

    useImperativeHandle(ref, () => ({
        blur() {
            inputRef.current?.blur()
        },
        focus() {
            inputRef.current?.focus()
        },
        isFocused() {
            return inputRef.current?.isFocused() || false
        }
    }), [])

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
                { ...onSearchProps }
                visible={visible}
                onConfirm={handleConfirm}
                value={value}
                onCancel={handleCancel}
            >
                {
                    filteredList.map(({ value, label }) => {
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
})

Picker.displayName = 'Picker'
