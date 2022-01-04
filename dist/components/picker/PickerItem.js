import React, { useContext, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { PickerContext } from './context';
import { isFunction } from '../../utils';
import { useTheme } from '../../hooks';
export const PickerItem = ({ style, children, value, isActive, onPress }) => {
    const theme = useTheme();
    const activeOpacity = 0.7;
    const { setValue, activeItemStyle, itemStyle } = useContext(PickerContext);
    const handlePress = (e) => {
        setValue === null || setValue === void 0 ? void 0 : setValue(value);
        onPress === null || onPress === void 0 ? void 0 : onPress(e);
    };
    const baseStyle = useMemo(() => {
        return {
            borderTopColor: theme.border,
            borderTopWidth: 1
        };
    }, []);
    const containerStyles = [baseStyle, itemStyle];
    if (style) {
        containerStyles.push(style);
    }
    if (isActive && activeItemStyle) {
        containerStyles.push(activeItemStyle);
    }
    const child = isFunction(children) ? children({ isActive }) : children;
    return (React.createElement(TouchableOpacity, { activeOpacity: activeOpacity, style: containerStyles, onPress: handlePress }, child));
};
PickerItem.displayName = 'PickerItem';
