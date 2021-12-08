import { ViewStyle, TextStyle } from 'react-native';

export interface ICheckListOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface ICheckListProps {
    value?: string[];
    options?: string[] | ICheckListOption[];
    onChange?: (value: string[]) => void;
    activeColor?: string;
    style?: ViewStyle;
    itemStyle?: ViewStyle;
}

export interface ICheckboxProps {
    checked?: boolean;
    wrapperStyle?: ViewStyle;
    iconStyle?: TextStyle;
    contentStyle?: ViewStyle;
    checkedColor?: string;
    uncheckColor?: string;
    onChange?: (checked: boolean) => void;
}
