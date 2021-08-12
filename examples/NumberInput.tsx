import React, { FC, useState } from 'react'
import { NumberInput, Toast } from '../src';

export const NumberInputDemo: FC = () => {
    const [value, setValue] = useState<number | undefined>();
    const handleChange = (value) => {
        setValue(value);
    }

    return (
        <NumberInput
            placeholder='number-input'
            value={value}
            onChangeText={handleChange}
            negative={false}
            precision={3}
            max={3}
            min={1}
            onBlur={() => {
                Toast.show(typeof value);
            }}
        />
    );
}
