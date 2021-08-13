import React, { FC } from 'react';
import { TextInput } from 'react-native';
import { INumberInputProps } from './interface';
import { regExp } from '../../utils';

const NumberInput: FC<INumberInputProps> = ({
    max,
    min,
    precision = 2,
    negative = true,
    value,
    onChangeText,
    ...restPropos
}: INumberInputProps) => {
    /**
     * onKeyPress事件在android设备上只能被虚拟按键触发，无法被物理按键触发
     * 所以只能用onChangeText对数据进行拦截
     * 但这么做有一个缺点，当以小数点结尾的时候只能传字符串，因为 Number('1.') ===> 1
     * 如果这种情况不传字符串会导致无法输入小数点
     */
    const handleChangeText = (value?: string) => {
        if (!onChangeText) return;

        if (!value) {
            onChangeText(undefined);
            return;
        }

        const float = precision > 0;
        
        if (negative && float && !regExp.number.test(value)) {
            return;
        }
        if (negative && !float && !regExp.integer.test(value)) {
            return;
        }
        if (!negative && float && !regExp.positive.test(value)) {
            return;
        }
        if (!negative && !float && !regExp.posInteger.test(value)) {
            return;
        }
        
        if (float) {
            const decimal = value.split('.')[1];
            if (decimal && (decimal.length > precision)) {
                return;
            }
        }
        
        const v = Number(value);
        if (max && v > max) {
            return;
        } else if (min && v < min) {
            return;
        }

        onChangeText(
            float && value.endsWith('.') ? value : v
        );
    }

    return (
        <TextInput
            onChangeText={handleChangeText}
            value={value ? String(value) : ''}
            { ...restPropos }
        />
    );
}

export default NumberInput;
