import { ViewStyle, StyleProp } from 'react-native';
export declare const styleUtils: {
    [x: string]: ViewStyle;
};
export declare function mergeStyle(style1?: StyleProp<ViewStyle> | null, style2?: StyleProp<ViewStyle> | null): StyleProp<ViewStyle> | null;
