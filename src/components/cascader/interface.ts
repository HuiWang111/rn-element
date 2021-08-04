import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type CascaderValueType = string | number;

export interface IOption {
    value: CascaderValueType;
    label?: string | ReactNode;
    chilren?: IOption[];
}

export interface ICascaderProps {
    value?: CascaderValueType[];
    options?: IOption[];
    style?: ViewStyle;
    notFoundContent?: string | ReactNode;
    zIndex?: number;
    onConfirm?: (value: CascaderValueType[]) => void;
    onCancel?: () => void;
    onVisibleChange?: (visible: boolean) => void;
}