import React, { FC, useState, useEffect, forwardRef, ForwardedRef, ClassAttributes } from 'react'
import { TextInput } from 'react-native'
import { Input } from '../input'
import { IPickerInputProps } from './interface'
import Icon from 'react-native-vector-icons/AntDesign'

export const PickerInput: FC<IPickerInputProps & ClassAttributes<TextInput>> = forwardRef(({
    value: propsValue,
    separater = ' / ',
    ...restProps
}: IPickerInputProps, ref: ForwardedRef<TextInput>) => {
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
            ref={ref}
        />
    )
})

PickerInput.displayName = 'PickerInput'
