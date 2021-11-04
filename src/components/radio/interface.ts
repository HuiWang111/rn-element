import { ReactText } from 'react';
import { ViewStyle } from 'react-native';

export interface IRadioListOption {
    label: string;
    value: ReactText;
    disabled?: boolean;
}

export interface IRadioListProps {
    value?: ReactText;
    options?: ReactText[] | IRadioListOption[];
    onChange?: (value: ReactText) => void;
    activeColor?: string;
    style?: ViewStyle;
    itemStyle?: ViewStyle;
}