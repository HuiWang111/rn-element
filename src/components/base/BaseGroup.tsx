import React, { FC, Children, PropsWithChildren, useState, useEffect, cloneElement, isValidElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { IBaseGroupProps } from './interface'
import { isUndefined } from '../../utils'

export const BaseGroup: FC<PropsWithChildren<IBaseGroupProps>> = ({
    defaultValue,
    value: propsValue,
    disabled = false,
    children,
    style,
    onChange
}: PropsWithChildren<IBaseGroupProps>) => {
    const [value, setValue] = useState<string[]>(propsValue ?? (defaultValue ?? []))

    useEffect(() => {
        setValue(propsValue ?? [])
    }, [propsValue])

    const handleChange = (v: string, checked?: boolean) => {
        let newValue: string[]
        if (isUndefined(checked)) {
            newValue = [v]
        } else {
            newValue = checked ? [...value, v] : value.filter(i => v !== i)
        }

        if (isUndefined(propsValue)) {
            setValue(newValue)
        } else if (onChange) {
            onChange(newValue)
        }
    }

    return (
        <View style={[styles.container, style]}>
            {
                Children.map(children, c => {
                    if (isValidElement(c)) {
                        return cloneElement(c, {
                            checked: value.includes(c.props.value),
                            disabled: c.props.disabled ?? disabled,
                            onChange: (checked: boolean) => handleChange(c.props.value, checked),
                            wrapperStyle: {
                                ...c.props.wrapperStyle,
                                marginRight: 8
                            }
                        })
                    }
                    return c
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})
