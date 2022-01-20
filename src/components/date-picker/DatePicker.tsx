import React, { FC, useState, useRef } from 'react'
import { StyleSheet, TextInput  } from 'react-native'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Icon from 'react-native-vector-icons/AntDesign'
import { PickerInput } from '../base'
import { IDatePickerProps } from './interface'
import { useMergedState } from '../../hooks'

export const DatePicker: FC = ({
    value: propsValue,
    defaultValue,
    format = 'YYYY-MM-DD',
    onChange,
    ...restProps
}: IDatePickerProps<Dayjs>) => {
    const inputRef = useRef<TextInput | null>(null)
    const [value, setValue, setValueWithOnChange] = useMergedState<Dayjs | null>(propsValue, {
        defaultValue,
        onChange
    })

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
            />
        </> 
    )
}
