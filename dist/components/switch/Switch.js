import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import { ThemeContext } from '../theme-provider';
export const Switch = ({ checked: propsChecked = false, disabled = false, style, onChange, onPress }) => {
    const { primary } = useContext(ThemeContext);
    const [checked, setChecked] = useState(propsChecked);
    const positionAnimate = useRef(new Animated.Value(2)).current;
    const duration = 200;
    const useNativeDriver = false;
    const leftPosition = 2;
    const rightPosition = 24;
    const handlePress = () => {
        if (!disabled) {
            onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
        }
        onPress === null || onPress === void 0 ? void 0 : onPress();
    };
    useEffect(() => {
        const toRight = () => {
            Animated.timing(positionAnimate, {
                toValue: rightPosition,
                duration,
                useNativeDriver
            }).start();
        };
        const toLeft = () => {
            Animated.timing(positionAnimate, {
                toValue: leftPosition,
                duration,
                useNativeDriver
            }).start();
        };
        if (propsChecked) {
            toRight();
        }
        else {
            toLeft();
        }
        setChecked(propsChecked);
    }, [propsChecked]);
    return (React.createElement(Pressable, { style: [
            styles.switchContainer,
            style,
            checked ? { backgroundColor: primary } : null,
            disabled ? styles.switchContainerDisabled : null
        ], onPress: handlePress },
        React.createElement(Animated.View, { style: [
                styles.switchHandle,
                { left: positionAnimate }
            ] })));
};
const styles = StyleSheet.create({
    switchContainer: {
        position: 'relative',
        width: 44,
        height: 22,
        lineHeight: 22,
        borderRadius: 100,
        backgroundColor: '#00000040'
    },
    switchContainerDisabled: {
        opacity: 0.4
    },
    switchHandle: {
        position: 'absolute',
        top: 2,
        width: 18,
        height: 18,
        backgroundColor: '#fff',
        borderRadius: 15
    }
});
