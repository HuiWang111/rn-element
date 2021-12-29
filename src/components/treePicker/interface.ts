import { ViewStyle } from 'react-native';
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

export interface ITreePickerProps extends Omit<IPickerProps, 'value' | 'onConfirm'> {
    value?: ReactText[];
    options?: IOptionWithChildren[];
    onConfirm?: (value: ReactText[]) => void;
}

export interface ITreePickerItemProps {
    style?: (ViewStyle | null | undefined)[];
    label: string;
    onPress: () => void;
}