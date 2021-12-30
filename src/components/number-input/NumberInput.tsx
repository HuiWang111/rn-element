import React, { FC, forwardRef, ForwardedRef, ClassAttributes } from 'react';
import { TextInput } from 'react-native';
import { INumberInputProps } from './interface';
import { regExp } from '../../utils';
import { Input } from '../input';

/**
 * 主要用于配合Form.Item的numeric属性使用，
 * 该组件实现对非数字字符输入的屏蔽，而Form.Item的numeric属性可以将输入结果转化为数字存储起来，
 * 从而form.getFieldsValue() 拿到的值就是数值类型了
 */
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
