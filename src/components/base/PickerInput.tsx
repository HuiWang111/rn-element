import React, { FC, forwardRef, ForwardedRef, ClassAttributes } from 'react'
import { TextInput } from 'react-native'
import { Input } from '../input'
import { IPickerInputProps } from './interface'
import Icon from 'react-native-vector-icons/AntDesign'

export const PickerInput: FC<IPickerInputProps & ClassAttributes<TextInput>> = forwardRef(({
    ...restProps
}: IPickerInputProps, ref: ForwardedRef<TextInput>) => {
    const noop = () => {
        // do nothing
    }

    return (
        <Input
            { ...restProps }
            onChangeText={noop}
            rightIcon={<Icon name='down' />}
            ref={ref}
        />
    )
})

PickerInput.displayName = 'PickerInput'
