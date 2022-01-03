import React, { FC, useState, useEffect, PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { ICheckboxProps } from './interface'
import { isString, isUndefined } from '../../utils'
import { useTheme } from '../../hooks'

export const Checkbox: FC<PropsWithChildren<ICheckboxProps>> = ({
    checked: propsChecked,
    defaultChecked,
    wrapperStyle,
    iconStyle,
    contentStyle,
    checkedColor: chcolor,
    uncheckColor: uncolor,
    children,
    onChange
}: PropsWithChildren<ICheckboxProps>) => {
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
        if (isUndefined(propsChecked)) {
            setChecked(!checked)
        }

        onChange?.(!checked)
    }

    return (
        <Pressable style={[styles.container, wrapperStyle]} onPress={handleChange}>
            <Icon
                style={[styles.icon, iconStyle]}
                name={checked ? 'check-square' : 'square'}
                color={checked ? checkedColor : uncheckColor}
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

Checkbox.displayName = 'Checkbox'

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
