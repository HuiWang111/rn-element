import React, { FC, useContext } from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { IPickerItem } from './interface';
import { PickerContext } from './context';
import { isFunction } from '../../utils';

export const PickerItem: FC<IPickerItem> = ({
    style,
    children,
    value,
    isActive,
    onPress
}: IPickerItem) => {
    const activeOpacity = 0.7;
    const { setValue, activeItemStyle, itemStyle } = useContext(PickerContext);
    const handlePress = (e: GestureResponderEvent) => {
        setValue?.(value);
        onPress?.(e);
    }

    const containerStyles = [itemStyle];
    if (style) {
        containerStyles.push(style);
    }
    if (isActive && activeItemStyle) {
        containerStyles.push(activeItemStyle);
    }

    const child = isFunction(children) ? children({ isActive }) : children;

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            style={containerStyles}
            onPress={handlePress}
        >
            { child }
        </TouchableOpacity>
    );
}
