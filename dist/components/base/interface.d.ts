import { ViewStyle, StyleProp, ImageRequireSource } from 'react-native';
export interface IMaskProps {
    zIndex?: number;
    backgroundColor?: string;
    style?: ViewStyle;
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
