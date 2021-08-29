import { ComponentType, ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import { StyleType } from '../../utils';

type ActiveChangeHandler = (activeIndex: number) => void;

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
    style?: StyleType;
    activeStyle?: StyleType;
    autoFocus?: boolean;
    keyboard?: boolean;
    children?: ReactNode | undefined | (({ isActive: boolean }) => ReactNode | undefined);
    inputComponent?: ComponentType;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
    onEnter?: () => void;
    /**
     * internal props
     * TODO: 隐藏 internal props 不被外部使用
     * onChange可以通过context解决，但是 index isActive 每一个item都不一样，暂时没找到解决方案
     */
    isActive?: boolean;
    index?: number;
}

export interface IInternalProps {
    onChange?: ActiveChangeHandler;
}

export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}

export interface IInputConfig {
    showSoftInputOnFocus: boolean;
}
