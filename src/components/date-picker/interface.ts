import { ViewStyle, StyleProp } from 'react-native'
import { IPickerInputProps } from '../base'

export interface IDatePickerProps<DateType> extends Omit<IPickerInputProps, 'value' | 'onChange' | 'defaultValue'> {
    value?: DateType;
    defaultValue?: DateType;
    format?: string;
    onChange?: (value: DateType | undefined) => void;
}

export interface IDateInformation {
    format: string;
    week: number;
    year: number;
    month: number;
    date: number;
    isCurrentMonth: boolean;
}

export interface IDatePickerPanelProps extends IDatePickerPanelHeaderProps {
    zIndex?: number;
    days: IDateInformation[];
    maskStyle?: StyleProp<ViewStyle>;
    visible?: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
}

export interface IDatePickerPanelHeaderProps {
    year: number;
    month: number;
    onNextMonth: (nextMonth: number) => void;
    onNextYear: (nextYear: number) => void;
    onPreviousMonth: (previousMonth: number) => void;
    onPreviousYear: (previousYear: number) => void;
}
