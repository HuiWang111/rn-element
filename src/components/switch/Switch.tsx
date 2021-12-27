import React, { FC, useState, useEffect, useRef } from 'react'
import { StyleSheet, Pressable, Animated } from 'react-native'
import { ISwitchProps } from './interface'
import { isUndefined } from '../../utils'
import { useTheme } from '../../hooks'

export const Switch: FC<ISwitchProps> = ({
    checked: propsChecked,
    defaultChecked,
    disabled = false,
    style,
    onChange,
    onPress
}: ISwitchProps) => {
    const { primary } = useTheme()
    const [checked, setChecked] = useState<boolean>(() => {
        const c = isUndefined(propsChecked) ? defaultChecked : propsChecked
        return c ?? false
    })
    const positionAnimate = useRef(new Animated.Value(2)).current
    const duration = 200
    const useNativeDriver = false
    const leftPosition = 2
    const rightPosition = 24 // 44 - 2 - 18

    const handlePress = () => {
        if (!disabled) {
            if (isUndefined(propsChecked)) {
                setChecked(!checked)
            }

            onChange?.(!checked)
        }

        onPress?.()
    }

    useEffect(() => {
        setChecked(propsChecked ?? false)
    }, [propsChecked])

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

        if (checked) {
            toRight()
        } else {
            toLeft()
        }
    }, [checked])

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
