import { ComponentType, ReactElement, ReactText } from 'react';
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
    key?: ReactText;
}

export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}

type ConfirmHandler = (selectedKey: ReactText) => void;
type OverlayFunc = () => React.ReactElement;

export interface IPickerProps {
    selectedKey: ReactText;
    overlay: ReactElement | OverlayFunc;
    zIndex?: number;
    onVisibleChange?: (visible: boolean) => void;
    onConfirm?: ConfirmHandler;
    onCancel?: () => void;
}