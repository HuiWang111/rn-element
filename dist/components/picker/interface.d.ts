import { ViewStyle, GestureResponderEvent } from 'react-native';
import { ReactNode, ReactText } from 'react';
export interface IMaskProps {
    zIndex?: number;
    backgroundColor?: string;
    style?: ViewStyle;
}
export interface IPickerFooterProps {
    onCancel?: () => void;
    onConfirm?: () => void;
}
export interface IPickerItem {
    style?: ViewStyle;
    children?: ReactNode | undefined | (({ isActive: boolean }: {
        isActive: any;
    }) => ReactNode | undefined);
    value: ReactText;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    isActive?: boolean;
}
export interface IPickerProps {
    zIndex?: number;
    maskStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    activeItemStyle?: ViewStyle;
    value?: ReactText;
    onCancel?: () => void;
    onConfirm?: (value: ReactText) => void;
}
export interface IInternalProps {
    setValue?: (value: ReactText) => void;
    activeItemStyle?: ViewStyle;
    itemStyle?: ViewStyle;
}
