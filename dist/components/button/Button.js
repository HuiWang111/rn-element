import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks';
export const Button = ({ type = 'default', danger = false, title, style, loading = false, disabled = false, spinnerStyle, titleStyle, onPress }) => {
    const { primary, error } = useTheme();
    const isPrimary = type === 'primary';
    let spinnerColor = spinnerStyle && spinnerStyle.color
        ? spinnerStyle.color
        : '#000000d9';
    let activeOpacity = 0.2;
    if (danger) {
        spinnerColor = error;
        if (isPrimary) {
            spinnerColor = '#fff';
        }
    }
    else if (isPrimary) {
        spinnerColor = '#fff';
    }
    if (loading) {
        activeOpacity = 0.5;
    }
    if (disabled) {
        activeOpacity = 1;
    }
    const handlePress = () => {
        if (loading || disabled) {
            return;
        }
        onPress === null || onPress === void 0 ? void 0 : onPress();
    };
    return (React.createElement(TouchableOpacity, { style: [
            styles.button,
            style,
            danger ? { borderColor: error } : null,
            isPrimary ? { borderColor: primary, backgroundColor: primary } : null,
            isPrimary && danger ? { borderColor: error, backgroundColor: error } : null,
            loading ? { opacity: 0.5 } : null,
            disabled ? styles.disabledButton : null
        ], onPress: handlePress, activeOpacity: activeOpacity },
        loading && (React.createElement(ActivityIndicator, { size: 'small', color: spinnerColor, style: [
                styles.spinner,
                spinnerStyle
            ] })),
        React.createElement(Text, { style: [
                styles.buttonTitle,
                titleStyle,
                danger ? { color: error } : null,
                isPrimary ? { color: '#fff' } : null,
                disabled ? styles.disabledText : null
            ] }, title)));
};
Button.displayName = 'Button';
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderColor: '#d9d9d9',
        backgroundColor: '#fff',
        borderRadius: 2,
        height: 32,
        borderWidth: 1,
        flexDirection: 'row'
    },
    disabledButton: {
        borderColor: '#d9d9d9',
        backgroundColor: '#f5f5f5'
    },
    buttonTitle: {
        fontWeight: '400',
        fontSize: 14,
        color: '#000000d9'
    },
    disabledText: {
        color: 'rgba(0, 0, 0, 0.25)'
    },
    spinner: {
        marginRight: 10
    }
});
