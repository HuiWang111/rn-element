import { ReactElement, ReactNode, Component } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
export interface IFn {
    label: string | ReactNode;
    disabled?: boolean;
    handler?: () => void;
    shouldDisplay?: boolean;
}
interface IFnKeyMap {
    F1?: number | number[];
    F2?: number | number[];
    F3?: number | number[];
    F4?: number | number[];
}
interface IHeaderConfig {
    left?: string | null | ReactElement;
    center?: string | null | ReactElement;
    right?: string | null | ReactElement;
}
interface IHeaderStyle {
    left?: StyleProp<ViewStyle>;
    center?: StyleProp<ViewStyle>;
    right?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
}
interface IChildrenParams {
    width: number;
    height: number;
}
interface IFnStyle {
    bar: StyleProp<ViewStyle>;
    col: StyleProp<ViewStyle>;
}
export interface IPageProps {
    F1?: IFn;
    F2?: IFn;
    F3?: IFn;
    F4?: IFn;
    mockFn?: boolean;
    keyborad?: boolean;
    header?: null | IHeaderConfig;
    mockFnKeyMap?: IFnKeyMap;
    headerStyle?: IHeaderStyle;
    fnStyle?: IFnStyle;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode | undefined | ((params: IChildrenParams) => ReactNode | undefined);
    Component?: typeof Component;
    componentProps?: any;
}
export {};
