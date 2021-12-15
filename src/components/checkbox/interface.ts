import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface ICheckListOption {
    label: string | ReactNode;
    value: string;
    disabled?: boolean;
}

export interface ICheckListProps {
    value?: string[];
    defaultValue?: string[];
    options?: string[] | ICheckListOption[];
    onChange?: (value: string[]) => void;
    activeColor?: string;
    style?: ViewStyle;
    itemStyle?: ViewStyle;
}

export interface ICheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    wrapperStyle?: ViewStyle;
    iconStyle?: TextStyle;
    contentStyle?: ViewStyle;
    checkedColor?: string;
    uncheckColor?: string;
    onChange?: (checked: boolean) => void;
}
