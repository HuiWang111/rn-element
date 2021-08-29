import React, { FC, forwardRef, LegacyRef } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { INumberInputProps } from './interface';
import { regExp } from '../../utils';

const NumberInput: FC<INumberInputProps> = forwardRef(({
    value,
    onChangeText,
    onBlur,
    ...restPropos
}: INumberInputProps, ref) => {
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
    
    /**
     * TODO: 这里使用onChange做了字符串 -> 数值的转换，但会导致一个问题:
     * 在和Form组件配合使用的时候，Form设置了校验时机(validateTrigger)为 `onChange` 时，
     * 这个组件会在 `onBlur` 时也进行一次校验
     */
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
            ref={ref as (LegacyRef<TextInput> | undefined)}
            { ...restPropos }
        />
    );
})

NumberInput.displayName = 'NumberInput';

export default NumberInput;
