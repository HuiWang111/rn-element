import { ViewStyle, GestureResponderEvent, StyleProp } from 'react-native'
import { ReactNode, ReactText } from 'react'
import { IPickerFooterProps } from '../base/interface'
import { IInputProps } from '../input'

export interface IPickerPanelItem {
    style?: ViewStyle;
    children?: ReactNode | undefined | (({ isActive: boolean }) => ReactNode | undefined);
    value: ReactText;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    isActive?: boolean;
}

export interface IPickerPanelProps {
    title?: ReactNode;
    headerStyle?: StyleProp<ViewStyle>;
    zIndex?: number;
    maskStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    activeItemStyle?: ViewStyle;
    value?: ReactText;
    visible?: boolean;
    showSearch?: boolean;
    searchInputProps?: IInputProps;
    fullScreen?: boolean;
    footerProps?: Omit<IPickerFooterProps, 'onCancel' | 'onConfirm'>;
    confirmOnSelect?: boolean;
    onSearch?: (keyword: string) => void;
    onCancel?: () => void;
    onConfirm?: (value: ReactText) => void;
}

export interface IInternalProps {
    activeItemStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    confirmOnSelect?: boolean;
    setValue?: (value: ReactText) => void;
    onConfirm?: (value: ReactText) => void;
}
