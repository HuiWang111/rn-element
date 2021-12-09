import { ViewStyle } from 'react-native';
export interface ISwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    onChange?: (checked: boolean) => void;
    onPress?: () => void;
}
