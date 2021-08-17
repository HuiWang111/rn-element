import React, { FC } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { INumberInputProps } from './interface';
import { regExp } from '../../utils';

const NumberInput: FC<INumberInputProps> = ({
    value,
    onChangeText,
    onBlur,
    ...restPropos
}: INumberInputProps) => {
    const handleChangeText = (val: string) => {
        if (!onChangeText) {
            return;
        }
        if (val !== '-' && val !== '' && !regExp.number.test(val)) {
            return;
        }

        onChangeText(val);
    }
    
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (onChangeText && value !== '-') {
            if (!value) {
                onChangeText(undefined);
            } else {
                onChangeText(Number(value));
            }
        }

        onBlur?.(e);
    }
    
    return (
        <TextInput
            onChangeText={handleChangeText}
            value={value ? String(value) : ''}
            onBlur={handleBlur}
            { ...restPropos }
        />
    );
}

export default NumberInput;
