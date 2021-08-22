import React, { PropsWithChildren, FC } from 'react';
import { View } from 'react-native';
import { IPickerItemProps } from './interface';

export const PickerItem: FC<PropsWithChildren<IPickerItemProps>> = ({
    isActive,
    itemStyle,
    activeItemStyle,
    children
}: PropsWithChildren<IPickerItemProps>) => {
    return (
        <View style={[itemStyle, isActive ? activeItemStyle : null]}>
            { children }
        </View>
    );
}
