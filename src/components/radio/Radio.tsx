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
    onChange
}: PropsWithChildren<IRadioProps>) => {
    const [checked, setChecked] = useState(() => {
        const c = isUndefined(propsChecked) ? defaultChecked : propsChecked
        return c ?? false
    })
    const colors = useTheme()
    const checkedColor = chcolor ? chcolor : colors.primary
    const uncheckColor = uncolor ? uncolor : colors.border

    useEffect(() => {
        setChecked(propsChecked ?? false)
    }, [propsChecked])

    const handleChange = () => {
        if (isUndefined(propsChecked) && !checked) {
            setChecked(true)
        }

        if (!checked) {
            onChange?.(true)
        }
    }

    return (
        <Pressable style={[styles.container, wrapperStyle]} onPress={handleChange}>
            <Icon
                style={[styles.icon, iconStyle]}
                name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
                color={checked ? checkedColor : uncheckColor}
                onPress={handleChange}
                size={18}
            />
            <View style={[styles.content, contentStyle]}>
                {
                    isString(children)
                        ? <Text style={{ color: '#000000d9', fontSize: 14 }}>{children}</Text>
                        : children
                }
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {},
    content: {
        marginLeft: 5
    }
})
