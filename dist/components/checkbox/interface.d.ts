import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { IBaseGroupProps } from '../base/interface';
interface ILabelRenderParams {
    isActive: boolean;
}
export interface ICheckListOption {
    label: ReactNode | ((params: ILabelRenderParams) => ReactNode);
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
export declare type ICheckboxGroupProps = Omit<IBaseGroupProps, 'disabled'>;
export {};
