import { ViewStyle, TextStyle } from 'react-native';
import { ICheckListProps } from '../checkbox/interface';
import { IBaseGroupProps } from '../base/interface';
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
    disabled?: boolean;
    value?: string;
    onChange?: () => void;
}
export interface IRadioGroupProps extends Omit<IBaseGroupProps, 'defaultValue' | 'value' | 'onChange'> {
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}
