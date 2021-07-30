import { ModalProps, ViewStyle } from 'react-native';

interface IModalBaseConfig {
    title?: string | JSX.Element;
    zIndex?: number;
    okText?: string;
    cancelText?: string;
    onCancel?: () => void;
    onOk?: () => void;
    onVisibleChange?: (visible: boolean) => void;
}

export interface IModalConfig extends IModalBaseConfig {
    content?: string | JSX.Element;
}

export interface IModalProps extends ModalProps, IModalBaseConfig {
    footer?: string | JSX.Element;
    titleStyle?: ViewStyle;
    bodyStyle?: ViewStyle;
    footerStyle?: ViewStyle;
}