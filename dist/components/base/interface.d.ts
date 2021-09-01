import { ViewStyle } from 'react-native';
export interface IMaskProps {
    zIndex?: number;
    backgroundColor?: string;
    style?: ViewStyle;
    visible?: boolean;
}
export interface IPickerFooterProps {
    onCancel?: () => void;
    onConfirm?: () => void;
}
