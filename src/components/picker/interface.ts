import { ViewStyle, GestureResponderEvent, TextInputProps } from 'react-native';
import { ReactNode, ReactText } from 'react';

export interface IPickerItem {
    style?: ViewStyle;
    children?: ReactNode | undefined | (({ isActive: boolean }) => ReactNode | undefined);
    value: ReactText;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    /**
     * internal props
     */
    isActive?: boolean;
}

export interface IPickerProps {
    zIndex?: number;
    maskStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    activeItemStyle?: ViewStyle;
    value?: ReactText;
    visible?: boolean;
    showSearch?: boolean;
    searchInputProps?: TextInputProps;
    onSearch?: (keyword: string) => void;
    onCancel?: () => void;
    onConfirm?: (value: ReactText) => void;
}

export interface IInternalProps {
    setValue?: (value: ReactText) => void;
    activeItemStyle?: ViewStyle;
    itemStyle?: ViewStyle;
}
