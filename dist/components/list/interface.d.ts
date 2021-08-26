import { ComponentType, ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import { StyleType } from '../../utils';
declare type ActiveChangeHandler = (activeIndex: number) => void;
export interface IListProps {
    activeIndex?: number;
    loop?: boolean;
    style?: StyleType;
    itemStyle?: StyleType;
    activeItemStyle?: StyleType;
    keyboard?: boolean;
    inputComponent?: ComponentType;
    onChange?: ActiveChangeHandler;
}
export interface IListItemProps {
    isActive?: boolean;
    style?: StyleType;
    activeStyle?: StyleType;
    autoFocus?: boolean;
    index?: number;
    keyboard?: boolean;
    children?: ReactNode | undefined | (({ isActive: boolean }: {
        isActive: any;
    }) => ReactNode | undefined);
    inputComponent?: ComponentType;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    onChange?: ActiveChangeHandler;
    onEnter?: () => void;
}
export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}
export interface IInputConfig {
    showSoftInputOnFocus: boolean;
}
export {};
