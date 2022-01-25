import { ComponentType, ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
declare type ActiveChangeHandler = (activeIndex: number) => void;
export interface IListProps {
    activeIndex?: number;
    loop?: boolean;
    style?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    activeItemStyle?: StyleProp<ViewStyle>;
    keyboard?: boolean;
    inputComponent?: ComponentType;
    onChange?: ActiveChangeHandler;
}
export interface IListItemProps {
    style?: StyleProp<ViewStyle>;
    autoFocus?: boolean;
    children?: ReactNode | undefined | (({ isActive: boolean }: {
        isActive: any;
    }) => ReactNode | undefined);
    inputComponent?: ComponentType;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    onEnter?: () => void;
    isActive?: boolean;
    index?: number;
}
export interface IInternalProps {
    onChange?: ActiveChangeHandler;
    activeItemStyle?: StyleProp<ViewStyle>;
    keyboard?: boolean;
}
export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}
export interface IInputConfig {
    showSoftInputOnFocus: boolean;
}
export interface IParentProps {
    activeIndex: number;
    inputComponent?: ComponentType;
    index: number;
    itemStyle?: StyleProp<ViewStyle>;
    onChange?: ActiveChangeHandler;
}
export {};
