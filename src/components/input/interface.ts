import { ReactNode } from 'react'
import { TextInputProps, ViewStyle } from 'react-native'

export interface IInputProps extends TextInputProps {
    clearable?: boolean;
    wrapStyle?: ViewStyle;
    rightIcon?: ReactNode;
    onClear?: () => void;
}
