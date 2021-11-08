import { ViewStyle, TextStyle } from 'react-native';
export interface IButtonProps {
    type?: 'primary' | 'default';
    danger?: boolean;
    title: string;
    style?: ViewStyle;
    loading?: boolean;
    disabled?: boolean;
    spinnerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    onPress?: () => void;
}
