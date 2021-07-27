import { StyleType } from '../utils';
declare type ActiveChangeHandler = (activeIndex: number) => void;
export interface IListProps {
    activeIndex: number;
    loop?: boolean;
    onChange?: ActiveChangeHandler;
    style?: StyleType;
    itemStyle?: StyleType;
    activeItemStyle?: StyleType;
}
export interface IListItemProps {
    isActive?: boolean;
    style?: StyleType;
    activeStyle?: StyleType;
}
export interface IInternalListItemProps extends IListItemProps {
    isActivable: boolean;
}
export {};
