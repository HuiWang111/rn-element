import React, { FC, useRef, useEffect } from 'react'
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData  } from 'react-native'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Icon from 'react-native-vector-icons/AntDesign'
import { PickerInput } from '../base'
import { IDatePickerProps } from './interface'
import { useMergedState, useVisible } from '../../hooks'
import { DatePickerPanel } from './DatePickerPanel'
import { wait } from '../../utils'

export const DatePicker: FC<IDatePickerProps<Dayjs>> = ({
    value: propsValue,
    defaultValue,
    format = 'YYYY-MM-DD',
    panelProps,
    onChange,
    onVisibleChange,
    onFocus,
    ...restProps
}: IDatePickerProps<Dayjs>) => {
    const inputRef = useRef<TextInput | null>(null)
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange)
    const [value, setValue, setValueWithOnChange] = useMergedState<Dayjs | undefined>(propsValue, {
        defaultValue,
        onChange
    })

    useEffect(() => {
        setValue(propsValue)
    }, [propsValue, setValue])
    
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        inputRef.current?.blur()
        showPanel()
        onFocus?.(e)
    }
    const handleCancel = () => {
        hidePanel()
        panelProps?.onCancel?.()
    }
    const handleConfirm = async () => {
        setValueWithOnChange(dayjs(), propsValue)
        await wait(100)
        hidePanel()
    }
    const handleDateChange = async (date: number) => {
        const d = value ?? dayjs()
        const newDate = d.set('date', date)
        setValueWithOnChange(newDate, propsValue)
        await wait(100)
        hidePanel()
    }

    return (
        <>
            <PickerInput
                clearable={false}
                { ...restProps }
                ref={inputRef}
                showSoftInputOnFocus={false}
                value={value ? value.format(format) : ''}
                onClear={() => onChange?.(undefined)}
                rightIcon={<Icon name='calendar' />}
                onFocus={handleFocus}
            />
            <DatePickerPanel
                visible={visible}
                value={propsValue}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                onDateChange={handleDateChange}
            />
        </> 
    )
}
