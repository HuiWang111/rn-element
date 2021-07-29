import { StyleType } from '../../utils';
declare type ActiveChangeHandler = (activeIndex: number) => void;
declare type EnterHandler = () => void;
export interface IListProps {
    activeIndex: number;
    loop?: boolean;
    style?: StyleType;
    itemStyle?: StyleType;
    activeItemStyle?: StyleType;
    keyboard?: boolean;
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
export {};
