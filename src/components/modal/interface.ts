import { ModalProps, ViewStyle } from 'react-native'

export interface IModalFooterProps {
    okText?: string;
    cancelText?: string;
    onCancel?: () => void;
    onOk?: () => void;
}

export type IModalFooter = string | JSX.Element | null | ((props: IModalFooterProps) => string | JSX.Element);

interface IModalBaseConfig extends IModalFooterProps {
    title?: string | JSX.Element | null;
    zIndex?: number;
    footer?: IModalFooter;
    onVisibleChange?: (visible: boolean) => void;
}

export interface IModalConfig extends IModalBaseConfig {
    content?: string | JSX.Element;
}

export interface IModalProps extends ModalProps, IModalBaseConfig {
    titleStyle?: ViewStyle;
    bodyStyle?: ViewStyle;
    footerStyle?: ViewStyle;
}

export type IModalType = 'confirm' | 'error' | 'info' | 'warning' | 'success';