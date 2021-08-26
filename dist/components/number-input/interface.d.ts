import { TextInputProps } from 'react-native';
export interface INumberInputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
    value?: number | string | undefined;
    onChangeText?: (value: number | string | undefined) => void;
}
