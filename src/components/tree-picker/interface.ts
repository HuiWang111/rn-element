import { ReactText } from 'react';
import { IPickerProps } from '../picker/interface'

// 最多支持三层
export interface IOption {
    label: string;
    value: ReactText;
}

export interface IOptionWithChildren {
    label: string;
    value: ReactText;
    children?: {
        label: string,
        value: ReactText,
        children?: {
            label: string,
            value: ReactText,
            children?: IOption[],
        }[],
    }[];
}

export interface ITreePickerProps extends Omit<IPickerProps, 'value' | 'onConfirm' | 'onSearch' | 'title'> {
    value?: ReactText[];
    options?: IOptionWithChildren[];
    title?: string | [string | undefined, string | undefined, string | undefined];
    onConfirm?: (value: ReactText[]) => void;
}

export interface IOnSearchProps {
    onSearch?: (val: string) => void;
}