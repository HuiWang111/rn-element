import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import { isUndefined } from '../../utils';
import { useTheme } from '../../hooks';
export const Switch = ({ checked: propsChecked, defaultChecked, disabled = false, style, onChange, onPress }) => {
    const { primary } = useTheme();
    const [checked, setChecked] = useState(() => {
        const c = isUndefined(propsChecked) ? defaultChecked : propsChecked;
        return c !== null && c !== void 0 ? c : false;
    });
    const positionAnimate = useRef(new Animated.Value(2)).current;
    const duration = 200;
    const useNativeDriver = false;
    const leftPosition = 2;
    const rightPosition = 24;
    const handlePress = () => {
        if (!disabled) {
            if (isUndefined(propsChecked)) {
                setChecked(!checked);
            }
            onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
        }
        onPress === null || onPress === void 0 ? void 0 : onPress();
    };
    useEffect(() => {
        setChecked(propsChecked !== null && propsChecked !== void 0 ? propsChecked : false);
    }, [propsChecked]);
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
        if (checked) {
            toRight();
        }
        else {
            toLeft();
        }
    }, [checked, positionAnimate, useNativeDriver]);
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
Switch.displayName = 'Switch';
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
