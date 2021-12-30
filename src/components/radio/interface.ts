import { ViewStyle, TextStyle } from 'react-native'
import { ICheckListProps } from '../checkbox/interface'

export interface IRadioListProps extends Omit<ICheckListProps, 'value' | 'onChange' | 'defaultValue'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export interface IRadioProps {
    checked?: boolean;
    defaultChecked?: boolean;
    wrapperStyle?: ViewStyle;
    iconStyle?: TextStyle;
    contentStyle?: ViewStyle;
    checkedColor?: string;
    uncheckColor?: string;
    onChange?: (checked: boolean) => void;
}