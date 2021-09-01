import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { ITreePickerItemProps } from './interface';

export const TreePickerItem: FC<ITreePickerItemProps> = ({
    style,
    label
}: ITreePickerItemProps) => {
    return (
        <View style={style}>
            <Text numberOfLines={1}>{label}</Text>
        </View>
    );
}
