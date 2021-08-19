import { TextInputProps } from 'react-native';

export interface INumberInputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
    // max?: number;
    // min?: number;
    // precision?: number;
    // negative?: boolean;
    value?: number | string | undefined;
    onChangeText?: (value: number | string | undefined) => void;
}
