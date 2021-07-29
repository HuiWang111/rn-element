import { StyleType } from '../utils';

type ActiveChangeHandler = (activeIndex: number) => void;
type EnterHandler = () => void;

export interface IListProps {
    activeIndex: number;
    loop?: boolean;
    style?: StyleType;
    itemStyle?: StyleType;
    activeItemStyle?: StyleType;
    pauseListener?: boolean;
    onChange?: ActiveChangeHandler;
    onEnter?: EnterHandler;
}

export interface IListItemProps {
    isActive?: boolean;
    style?: StyleType;
    activeStyle?: StyleType;
}

export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}