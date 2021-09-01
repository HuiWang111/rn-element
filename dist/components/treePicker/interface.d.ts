import { ViewStyle } from 'react-native';
import { ReactText } from 'react';
export interface IOption {
    label: string;
    value: ReactText;
    children?: {
        label: string;
        value: ReactText;
        children?: {
            label: string;
            value: ReactText;
        }[];
    }[];
}
export interface ITreePickerProps {
    zIndex?: number;
    maskStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    activeItemStyle?: ViewStyle;
    unfocusActiveItemStyle?: ViewStyle;
    value?: ReactText[];
    visible?: boolean;
    options?: IOption[];
    onCancel?: () => void;
    onConfirm?: (value: ReactText[]) => void;
}
export interface ITreePickerItemProps {
    style?: (ViewStyle | null | undefined)[];
    label: string;
    onPress: () => void;
}
