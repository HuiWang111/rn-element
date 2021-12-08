import React, { FC, useState, useEffect, useContext, PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { ICheckboxProps } from './interface'
import { ThemeContext } from '../theme-provider'
import { isString } from '../../utils'

export const Checkbox: FC<PropsWithChildren<ICheckboxProps>> = ({
    checked: propsChecked = false,
    wrapperStyle,
    iconStyle,
    contentStyle,
    checkedColor: chcolor,
    uncheckColor: uncolor,
    children,
    onChange
}: PropsWithChildren<ICheckboxProps>) => {
    const [checked, setChecked] = useState(propsChecked)
    const colors = useContext(ThemeContext)
    const checkedColor = chcolor ? chcolor : colors.primary
    const uncheckColor = uncolor ? uncolor : colors.border

    useEffect(() => {
        setChecked(propsChecked)
    }, [propsChecked])

    const handleChange = () => {
        onChange?.(!checked)
    }

    return (
        <Pressable style={[styles.container, wrapperStyle]} onPress={handleChange}>
            <Icon
                style={[styles.icon, iconStyle]}
                name={checked ? 'check-square' : 'square'}
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
