import { ViewStyle, GestureResponderEvent, StyleProp } from 'react-native';
import { ReactNode } from 'react';
import { IPickerFooterProps } from '../base/interface';
import { IInputProps } from '../input';
export interface IPickerPanelItem {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode | undefined | (({ isActive: boolean }: {
        isActive: any;
    }) => ReactNode | undefined);
    value: string;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    isActive?: boolean;
}
export interface IPickerPanelProps {
    title?: ReactNode;
    headerStyle?: StyleProp<ViewStyle>;
    zIndex?: number;
    maskStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    activeItemStyle?: StyleProp<ViewStyle>;
    value?: string;
    visible?: boolean;
    showSearch?: boolean;
    searchInputProps?: IInputProps;
    fullScreen?: boolean;
    footerProps?: Omit<IPickerFooterProps, 'onCancel' | 'onConfirm'>;
    confirmOnSelect?: boolean;
    onSearch?: (keyword: string) => void;
    onCancel?: () => void;
    onConfirm?: (value: string) => void;
}
export interface IInternalProps {
    activeItemStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    confirmOnSelect?: boolean;
    setValue?: (value: string) => void;
    onConfirm?: (value: string) => void;
}
