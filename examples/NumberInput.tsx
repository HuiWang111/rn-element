import React, { FC, useState } from 'react'
import { Button } from 'react-native'
import { NumberInput, Toast } from '../src'

export const NumberInputDemo: FC = () => {
    const [value, setValue] = useState<number | undefined>()
    const handleChange = (val) => {
        setValue(val)
    }
    
    return (
        <>
            <NumberInput
                placeholder='number-input'
                value={value}
                onChangeText={handleChange}
            />
            <Button onPress={() => Toast.show(typeof value)} title='show value type'></Button>
        </>
    )
}
