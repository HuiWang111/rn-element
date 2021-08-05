import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type PickerValueType = string | number;

export interface IOption {
    value: PickerValueType;
    label?: string | ReactNode;
    // chilren?: IOption[];
}

export interface IPickerProps {
    value?: PickerValueType;
    options?: IOption[];
    style?: ViewStyle;
    notFoundContent?: string | ReactNode;
    zIndex?: number;
    keyborad?: boolean;
    onConfirm?: (value: PickerValueType) => void;
    onCancel?: () => void;
    onVisibleChange?: (visible: boolean) => void;
}