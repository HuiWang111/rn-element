import { ReactText } from 'react';
import { IPickerProps } from '../picker/interface';
export interface IOption {
    label: string;
    value: ReactText;
}
export interface IOptionWithChildren {
    label: string;
    value: ReactText;
    children?: {
        label: string;
        value: ReactText;
        children?: {
            label: string;
            value: ReactText;
            children?: IOption[];
        }[];
    }[];
}
export interface ITreePickerProps extends Omit<IPickerProps, 'value' | 'onConfirm' | 'onSearch'> {
    value?: ReactText[];
    options?: IOptionWithChildren[];
    onConfirm?: (value: ReactText[]) => void;
}
export interface IOnSearchProps {
    onSearch?: (val: string) => void;
}
