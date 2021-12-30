import React, { FC, useState, useEffect, PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { IRadioProps } from './interface'
import { isString, isUndefined } from '../../utils'
import { useTheme } from '../../hooks'

export const Radio: FC<PropsWithChildren<IRadioProps>> = ({
    checked: propsChecked,
    defaultChecked = false,
    wrapperStyle,
    iconStyle,
    contentStyle,
    checkedColor: chcolor,
    uncheckColor: uncolor,
    children,
    disabled = false,
    onChange
}: PropsWithChildren<IRadioProps>) => {
    const [checked, setChecked] = useState(() => {
        const c = isUndefined(propsChecked) ? defaultChecked : propsChecked
        return c ?? false
    })
    const colors = useTheme()
    let checkedColor = chcolor ? chcolor : colors.primary
    let uncheckColor = uncolor ? uncolor : colors.border

    if (disabled) {
        uncheckColor = colors.disabled
        checkedColor = colors.disabled
    }

    useEffect(() => {
        setChecked(propsChecked ?? false)
    }, [propsChecked])

    const handlePress = () => {
        if (disabled) {
            return
        }

        if (isUndefined(propsChecked) && !checked) {
            setChecked(true)
        }

        onChange?.()
    }

    return (
        <Pressable
            style={[
                styles.container,
                wrapperStyle,
            ]}
            onPress={handlePress}
        >
            <Icon
                style={[styles.icon, iconStyle]}
                name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
                color={checked ? checkedColor : uncheckColor}
                size={18}
            />
            <View style={[styles.content, contentStyle]}>
                {
                    isString(children)
                        ? (
                            <Text
                                style={{
                                    color: disabled ? colors.disabledText : '#000000d9',
                                    fontSize: 14
                                }}
                            >
                                {children}
                            </Text>
                        )
                        : children
                }
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    icon: {},
    content: {
        marginLeft: 5
    }
})
