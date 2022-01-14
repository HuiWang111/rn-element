import React, { FC, useState, useEffect } from 'react'
import { Input } from '../input'
import { IPickerInputProps } from './interface'
import Icon from 'react-native-vector-icons/AntDesign'

export const PickerInput: FC<IPickerInputProps> = ({
    value: propsValue,
    separater = ' / ',
    ...restProps
}: IPickerInputProps) => {
    const [value, setValue] = useState<string>(() => {
        return propsValue
            ? propsValue.join(separater)
            : ''
    })

    useEffect(() => {
        setValue(
            propsValue
                ? propsValue.join(separater)
                : ''
        )
    }, [propsValue, separater])
    
    const noop = () => {
        // do nothing
    }

    return (
        <Input
            { ...restProps }
            value={value}
            onChangeText={noop}
            rightIcon={<Icon name='down' />}
        />
    )
}
