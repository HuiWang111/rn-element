import React, { FC, forwardRef, ForwardedRef, ClassAttributes } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInput } from 'react-native';
import { INumberInputProps } from './interface';
import { regExp } from '../../utils';
import { Input } from '../input';

const NumberInput: FC<INumberInputProps & ClassAttributes<TextInput>> = forwardRef(({
    value,
    onChangeText,
    onBlur,
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
        <Input
            onChangeText={handleChangeText}
            value={value ? String(value) : ''}
            onBlur={handleBlur}
            ref={ref}
            { ...restPropos }
        />
    );
})

NumberInput.displayName = 'NumberInput';

export default NumberInput;
