import { ComponentType, ReactElement, ReactNode, ReactText } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, GestureResponderEvent } from 'react-native';
import { StyleType } from '../../utils';

type ActiveChangeHandler = (activeIndex: number) => void;
type CommonKeyboardHandler = () => void;

export interface IListProps {
    activeIndex?: number;
    loop?: boolean;
    style?: StyleType;
    itemStyle?: StyleType;
    activeItemStyle?: StyleType;
    keyboard?: boolean;
    inputComponent?: ComponentType;
    onChange?: ActiveChangeHandler;
    onEnter?: CommonKeyboardHandler;
    onF1?: CommonKeyboardHandler;
    onF2?: CommonKeyboardHandler;
    onF3?: CommonKeyboardHandler;
    onF4?: CommonKeyboardHandler;
}

export interface IListItemProps {
    isActive?: boolean;
    style?: StyleType;
    activeStyle?: StyleType;
    autoFocus?: boolean;
    inputComponent?: ComponentType;
    value?: ReactText;
}

export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}

export interface IPickerProps {
    value: ReactText;
    overlay: ReactElement | (() => React.ReactElement);
    zIndex?: number;
    title?: string | ReactNode;
    onVisibleChange?: (visible: boolean) => void;
    onConfirm?: (selectedKey: ReactText) => void;
    onCancel?: () => void;
}

export type PressEvent = NativeSyntheticEvent<NativeTouchEvent> | GestureResponderEvent;