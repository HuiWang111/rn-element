/// <reference types="react" />
import { ViewStyle, StyleProp } from 'react-native';
export interface IModalFooterProps {
    okText?: string;
    cancelText?: string;
    onCancel?: () => void;
    onOk?: () => void;
}
export declare type IModalFooter = string | JSX.Element | null | ((props: IModalFooterProps) => string | JSX.Element);
interface IModalBaseConfig extends IModalFooterProps {
    title?: string | JSX.Element | null;
    zIndex?: number;
    footer?: IModalFooter;
    onVisibleChange?: (visible: boolean) => void;
}
export interface IModalConfig extends IModalBaseConfig {
    content?: string | JSX.Element;
}
export interface IModalProps extends IModalBaseConfig {
    titleStyle?: StyleProp<ViewStyle>;
    bodyStyle?: StyleProp<ViewStyle>;
    footerStyle?: StyleProp<ViewStyle>;
    visible?: boolean;
}
export declare type IModalType = 'confirm' | 'error' | 'info' | 'warning' | 'success';
export {};
