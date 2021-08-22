import { ReactElement, ReactText } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, GestureResponderEvent, ViewStyle } from 'react-native';

export interface IPickerProps {
    value: ReactText;
    overlay: ReactElement | (() => React.ReactElement);
    zIndex?: number;
    title?: ReactElement;
    itemStyle?: ViewStyle;
    activeItemStyle?: ViewStyle;
    onVisibleChange?: (visible: boolean) => void;
    onConfirm?: (selectedKey: ReactText) => void;
    onCancel?: () => void;
    onChange?: (value: ReactText) => void;
}

export interface IPickerItemProps {
    value: ReactText;
    isActive?: boolean;
    itemStyle?: ViewStyle;
    activeItemStyle?: ViewStyle;
}

export type PressEvent = NativeSyntheticEvent<NativeTouchEvent> | GestureResponderEvent;