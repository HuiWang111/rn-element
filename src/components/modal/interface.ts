import { ViewStyle, StyleProp } from 'react-native'
import { ReactNode } from 'react'

export interface IModalFooterProps {
    okText?: string;
    cancelText?: string;
    onCancel?: () => void;
    onOk?: () => void;
}

export type IModalFooter = string | JSX.Element | null | ((props: IModalFooterProps) => string | JSX.Element);

interface IModalBaseConfig extends IModalFooterProps {
    title?: ReactNode;
    zIndex?: number;
    footer?: IModalFooter;
    onVisibleChange?: (visible: boolean) => void;
}

export interface IModalConfig extends IModalBaseConfig {
    content?: ReactNode;
}

export interface IModalProps extends IModalBaseConfig {
    titleStyle?: StyleProp<ViewStyle>;
    bodyStyle?: StyleProp<ViewStyle>;
    footerStyle?: StyleProp<ViewStyle>;
    visible?: boolean;
}

export type IModalType = 'confirm' | 'error' | 'info' | 'warning' | 'success';