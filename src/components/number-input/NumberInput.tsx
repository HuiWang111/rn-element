import React, { FC, forwardRef, ForwardedRef, ClassAttributes } from 'react';
import { TextInput } from 'react-native';
import { INumberInputProps } from './interface';
import { regExp } from '../../utils';
import { Input } from '../input';

const NumberInput: FC<INumberInputProps & ClassAttributes<TextInput>> = forwardRef(({
    value,
    onChangeText,
    ...restPropos
}: INumberInputProps, ref: ForwardedRef<TextInput>) => {
    const handleChangeText = (val: string) => {
        if (!onChangeText) {
            return;
        }

        const allowInputChars = ['-', ''];
        if (!allowInputChars.includes(val) && !regExp.number.test(val)) {
            return;
        }

        onChangeText(val);
    }
    
    return (
        <Input
            onChangeText={handleChangeText}
            value={value ? String(value) : ''}
            ref={ref}
            { ...restPropos }
        />
    );
})

NumberInput.displayName = 'NumberInput';

export default NumberInput;
