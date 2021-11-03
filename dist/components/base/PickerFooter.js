import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../theme-provider';
export const PickerFooter = ({ onCancel, onConfirm }) => {
    const activeOpacity = 0.7;
    const colors = useContext(ThemeContext);
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
            React.createElement(Text, { style: textStyle }, "\u53D6\u6D88")),
        React.createElement(TouchableOpacity, { style: [
                styles.btn,
                styles.confirmBtn,
                {
                    borderLeftColor: colors.border
                }
            ], activeOpacity: activeOpacity, onPress: onConfirm },
            React.createElement(Text, { style: textStyle }, "\u786E\u8BA4"))));
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
