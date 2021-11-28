import { ViewStyle } from 'react-native';

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