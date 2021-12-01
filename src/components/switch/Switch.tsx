import React, { FC, useContext, useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Pressable, Animated } from 'react-native'
import { ISwitchProps } from './interface'
import { ThemeContext } from '../theme-provider'

export const Switch: FC<ISwitchProps> = ({
    checked: propsChecked = false,
    disabled = false,
    style,
    onChange,
    onPress
}: ISwitchProps) => {
    const { primary } = useContext(ThemeContext)
    const [checked, setChecked] = useState<boolean>(propsChecked)
    const positionAnimate = useRef(new Animated.Value(2)).current
    const duration = 200
    const useNativeDriver = false
    const leftPosition = 2
    const rightPosition = 24 // 44 - 2 - 18

    const handlePress = () => {
        if (!disabled) {
            onChange?.(!checked)
        }

        onPress?.()
    }

    useEffect(() => {
        const toRight = (): void => {
            Animated.timing(positionAnimate, {
                toValue: rightPosition,
                duration,
                useNativeDriver
            }).start()
        }
        const toLeft = () => {
            Animated.timing(positionAnimate, {
                toValue: leftPosition,
                duration,
                useNativeDriver
            }).start()
        }

        if (propsChecked) {
            toRight()
        } else {
            toLeft()
        }

        setChecked(propsChecked)
    }, [propsChecked])

    return (
        <Pressable
            style={[
                styles.switchContainer,
                style,
                checked ? { backgroundColor: primary } : null,
                disabled ? styles.switchContainerDisabled : null
            ]}
            onPress={handlePress}
        >
            <Animated.View
                style={[
                    styles.switchHandle,
                    { left: positionAnimate }
                ]}
            >
            </Animated.View>
        </Pressable>
    )
}

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
})
