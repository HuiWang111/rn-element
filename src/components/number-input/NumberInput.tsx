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
     * TODO: 在 `onBlur` 时将字符串转换为数字
     * 在配合Form使用，检验必须为数字类型时，最好将检验时机(validateTrigger)设置为 `onBlur`
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
