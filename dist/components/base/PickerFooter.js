import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../hooks';
export const PickerFooter = ({ cancelText = '取消', confirmText = '确认', onCancel, onConfirm }) => {
    const activeOpacity = 0.7;
    const colors = useTheme();
    const textStyle = {
        color: colors.primary
    };
    return (React.createElement(View, { style: [
            styles.footer,
            {
                borderTopColor: colors.border
            }
        ] },
        React.createElement(TouchableOpacity, { style: styles.btn, activeOpacity: activeOpacity, onPress: onCancel },
            React.createElement(Text, { style: textStyle }, cancelText)),
        React.createElement(TouchableOpacity, { style: [
                styles.btn,
                styles.confirmBtn,
                {
                    borderLeftColor: colors.border
                }
            ], activeOpacity: activeOpacity, onPress: onConfirm },
            React.createElement(Text, { style: textStyle }, confirmText))));
};
const styles = StyleSheet.create({
    footer: {
        height: 50,
        borderTopWidth: 1,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmBtn: {
        borderLeftWidth: 1
    }
});
