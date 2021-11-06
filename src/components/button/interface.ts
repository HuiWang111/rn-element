import { ViewStyle } from 'react-native';

export interface IButtonProps {
    type?: 'primary' | 'default';
    danger?: boolean;
    title: string;
    style?: ViewStyle;
    loading?: boolean;
    disabled?: boolean;
    spinnerStyle?: ViewStyle;
    onPress?: () => void;
}