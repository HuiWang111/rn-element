import React from 'react';
import { View, Text } from 'react-native';
export const TreePickerItem = ({ style, label }) => {
    return (React.createElement(View, { style: style },
        React.createElement(Text, { numberOfLines: 1 }, label)));
};
