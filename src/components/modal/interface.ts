import { ModalProps, ViewStyle } from 'react-native';

export interface IModalProps extends ModalProps {
    title?: string | JSX.Element;
    footer?: string | JSX.Element;
    zIndex?: number;
    okText?: string;
    titleStyle?: ViewStyle;
    bodyStyle?: ViewStyle;
    footerStyle?: ViewStyle;
    cancelText?: string;
    onCancel?: () => void;
    onOk?: () => void;
    onVisibleChange?: (visible: boolean) => void;
}