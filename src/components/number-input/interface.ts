import { IInputProps } from '../input/interface'

export interface INumberInputProps extends Omit<IInputProps, 'onChangeText' | 'value'> {
    // max?: number;
    // min?: number;
    // precision?: number;
    // negative?: boolean;
    value?: number | string | undefined;
    onChangeText?: (value: number | string | undefined) => void;
}
