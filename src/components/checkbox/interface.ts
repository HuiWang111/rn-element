import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { IBaseGroupProps } from '../base/interface'

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
    value?: string;
    onChange?: (checked: boolean) => void;
}

export type ICheckboxGroupProps = Omit<IBaseGroupProps, 'disabled'>
