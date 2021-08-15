import React, { FC } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { INumberInputProps } from './interface';
import { isString, regExp } from '../../utils';

const NumberInput: FC<INumberInputProps> = ({
    max,
    min,
    precision = 10,
    negative = true,
    value,
    onChangeText,
    onBlur,
    ...restPropos
}: INumberInputProps) => {
    const handleChangeText = (val?: string) => {
        if (!onChangeText) return;

        if (!val) {
            onChangeText(undefined);
            return;
        }

        const float = precision > 0;
        
        if (negative && float && !regExp.number.test(val)) {
            return;
        }
        if (negative && !float && !regExp.integer.test(val)) {
            return;
        }
        if (!negative && float && !regExp.positive.test(val)) {
            return;
        }
        if (!negative && !float && !regExp.posInteger.test(val)) {
            return;
        }
        
        if (float) {
            const decimal = val.split('.')[1];
            if (decimal && (decimal.length > precision)) {
                return;
            }
        }
        
        const v = Number(val);
        if (max && v > max) {
            return;
        } else if (min && v < min) {
            return;
        }

        onChangeText(
            float && val.endsWith('.') ? val : v
        );
    }
    
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (onBlur) {
            onBlur(e);
        }

        /**
         * 在 handleChangeText 函数中，当以.结尾时(如 2.)，传递给 onChangeText 时字符串。
         * 因此在blur时修复这个问题，避免外部接受的是一个字符串。
         * 这样保证了无论输入的是什么，外部最终拿到的一定是 number | undefined
         */
        if (onChangeText && isString(value) && value.endsWith('.')) {
            onChangeText(Number(value));
        }
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
