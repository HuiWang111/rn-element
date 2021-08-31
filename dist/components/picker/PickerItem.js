import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { PickerContext } from './context';
export const PickerItem = ({ style, children, value, isActive, onPress }) => {
    const activeOpacity = 0.7;
    const { setValue, activeItemStyle, itemStyle } = useContext(PickerContext);
    const handlePress = (e) => {
        setValue === null || setValue === void 0 ? void 0 : setValue(value);
        onPress === null || onPress === void 0 ? void 0 : onPress(e);
    };
    const containerStyles = [itemStyle];
    if (style) {
        containerStyles.push(style);
    }
    if (isActive && activeItemStyle) {
        containerStyles.push(activeItemStyle);
    }
    return (React.createElement(TouchableOpacity, { activeOpacity: activeOpacity, style: containerStyles, onPress: handlePress }, children));
};
