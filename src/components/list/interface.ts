import { ComponentType } from 'react';
import { StyleType } from '../../utils';

type ActiveChangeHandler = (activeIndex: number) => void;
type EnterHandler = () => void;

export interface IListProps {
    activeIndex: number;
    loop?: boolean;
    style?: StyleType;
    itemStyle?: StyleType;
    activeItemStyle?: StyleType;
    keyboard?: boolean;
    InputComponent?: ComponentType;
    onChange?: ActiveChangeHandler;
    onEnter?: EnterHandler;
}

export interface IListItemProps {
    isActive?: boolean;
    style?: StyleType;
    activeStyle?: StyleType;
    autoFocus?: boolean;
    InputComponent?: ComponentType;
}

export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}