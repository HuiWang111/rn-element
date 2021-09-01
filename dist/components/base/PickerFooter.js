import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../utils';
export const PickerFooter = ({ onCancel, onConfirm }) => {
    const activeOpacity = 0.7;
    return (React.createElement(View, { style: styles.footer },
        React.createElement(TouchableOpacity, { style: styles.btn, activeOpacity: activeOpacity, onPress: onCancel },
            React.createElement(Text, { style: styles.text }, "\u53D6\u6D88")),
        React.createElement(TouchableOpacity, { style: [styles.btn, styles.confirmBtn], activeOpacity: activeOpacity, onPress: onConfirm },
            React.createElement(Text, { style: styles.text }, "\u786E\u8BA4"))));
};
const styles = StyleSheet.create({
    footer: {
        height: 50,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmBtn: {
        borderLeftColor: colors.border,
        borderLeftWidth: 1
    },
    text: {
        color: colors.primary
    }
});
