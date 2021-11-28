import { IInputProps } from '../input/interface';
export interface INumberInputProps extends Omit<IInputProps, 'onChangeText' | 'value'> {
    value?: number | string | undefined;
    onChangeText?: (value: number | string | undefined) => void;
}
