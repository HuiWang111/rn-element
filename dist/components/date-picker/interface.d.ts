import { Dayjs } from 'dayjs';
import { ViewStyle, StyleProp } from 'react-native';
import { IPickerInputProps } from '../base';
export interface IDatePickerProps<DateType> extends Omit<IPickerInputProps, 'value' | 'onChange' | 'defaultValue'> {
    value?: DateType;
    defaultValue?: DateType;
    format?: string;
    panelProps?: Omit<IDatePickerPanelProps<DateType>, 'visible' | 'days' | 'onConfirm' | 'onPressToday' | keyof IDatePickerPanelHeaderProps>;
    onChange?: (value: DateType | undefined) => void;
    onVisibleChange?: (visible: boolean) => void;
}
export interface IDateInformation {
    format: string;
    day: number;
    year: number;
    month: number;
    date: number;
    isCurrentMonth: boolean;
}
export interface IDatePickerPanelProps<DateType> {
    zIndex?: number;
    maskStyle?: StyleProp<ViewStyle>;
    visible?: boolean;
    value?: Dayjs;
    onCancel?: () => void;
    onConfirm?: () => void;
    onDateChange?: (date: number) => void;
}
export interface IDatePickerPanelHeaderProps {
    year: number;
    month: number;
    onNextMonth: () => void;
    onNextYear: () => void;
    onPreviousMonth: () => void;
    onPreviousYear: () => void;
}
