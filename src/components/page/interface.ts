import { ReactElement, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

interface IFn {
    label: string;
    handler?: () => void;
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
    left?: ViewStyle;
    center?: ViewStyle;
    right?: ViewStyle;
    container?: ViewStyle;
}

interface IChildrenParams {
    width: number;
    height: number;
}

interface IFnStyle {
    bar: ViewStyle;
    col: ViewStyle;
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
    FnStyle?: IFnStyle;
    style?: ViewStyle;
    children?: ReactNode | undefined | ((params: IChildrenParams) => ReactNode | undefined);
}