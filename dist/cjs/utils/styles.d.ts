import { ViewStyle } from 'react-native';
import { StyleType } from './interface';
export declare const styleUtils: {
    [x: string]: ViewStyle;
};
export declare function mergeStyle(style1?: StyleType, style2?: StyleType): Record<string, unknown> | null;
