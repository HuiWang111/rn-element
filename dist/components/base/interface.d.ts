import { ViewStyle, StyleProp, ImageRequireSource } from 'react-native';
import { IInputProps } from '../input';
export interface IMaskProps {
    zIndex?: number;
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
    visible?: boolean;
}
export interface IPickerFooterProps {
    onCancel?: () => void;
    onConfirm?: () => void;
    cancelText?: string;
    confirmText?: string;
}
export interface IEmptyProps {
    style?: StyleProp<ViewStyle>;
    description?: string;
    image?: ImageRequireSource;
}
export interface IBaseGroupProps {
    defaultValue?: string[];
    value?: string[];
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onChange?: (value: string[]) => void;
}
export declare type IPickerInputProps = IInputProps;
export interface IPickerRef {
    isFocused: () => boolean;
    focus: () => void;
    blur: () => void;
}
