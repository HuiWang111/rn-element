import React, { FC, useState, useEffect, ReactNode } from 'react'
import { View, StyleSheet, Pressable, Text, Dimensions, ViewStyle } from 'react-native'
import { ICheckListProps } from './interface'
import { isObject, isUndefined, isString, isFunction } from '../../utils'
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from '../../hooks'

const { width } = Dimensions.get('window')

export const CheckList: FC<ICheckListProps> = ({
    value: propsValue,
    defaultValue,
    options,
    activeColor: selectedColor,
    style,
    itemStyle,
    onChange
}: ICheckListProps) => {
    const [value, setValue] = useState<string[]>(() => {
        const v = isUndefined(propsValue) ? defaultValue : propsValue
        return v ?? [] 
    })
    const theme = useTheme()
    const activeColor = selectedColor || theme.primary

    useEffect(() => {
        setValue(propsValue ?? [])
    }, [propsValue])

    const handleChange = (pressedValue: string, disabled = false): void => {
        if (disabled) {
            return
        }

        let newValue: string[]
        if (value.includes(pressedValue)) {
            newValue = value.filter(v => v !== pressedValue)
        } else {
            newValue = [...value, pressedValue]
        }

        if (isUndefined(propsValue)) {
            setValue(newValue)            
        }

        onChange?.(newValue)
    }
    const getItemStyles = (isActive: boolean, index: number): (ViewStyle | null | undefined)[] => {
        return [
            styles.item,
            { borderTopColor: theme.border },
            isActive && activeColor ? { backgroundColor: activeColor } : null,
            index === 0 ? { borderTopWidth: 0 } : null,
            itemStyle
        ]
    }

    const renderLabel = (label: ReactNode, disabled: boolean, isActive: boolean) => {
        if (isString(label)) {
            return (
                <Text
                    style={[
                        styles.itemText,
                        isActive ? styles.activeItemText : null,
                        disabled ? { color: theme.border } : null
                    ]}
                    numberOfLines={3}
                >
                    { label }
                </Text>
            )
        }

        return label
    }

    return (
        <View style={style}>
            {
                options?.map((option, index) => {
                    if (isObject(option)) {
                        const isActive = value.includes(option.value)

                        return (
                            <Pressable
                                key={option.value}
                                onPress={() => handleChange(option.value, option.disabled)}
                                style={getItemStyles(isActive, index)}
                            >
                                <Icon
                                    name={isActive ? 'check-square' : 'square'}
                                    color={isActive ? '#fff' : theme.border}
                                    size={20}
                                    style={styles.checkIcon}
                                />
                                {
                                    isFunction(option.label)
                                        ? renderLabel(option.label({ isActive }), option.disabled, isActive)
                                        : renderLabel(option.label, option.disabled, isActive)
                                }
                            </Pressable>
                        )
                    }

                    const isActive = value.includes(option)

                    return (
                        <Pressable
                            key={option}
                            onPress={() => handleChange(option)}
                            style={getItemStyles(isActive, index)}
                        >
                            <Icon
                                name={isActive ? 'check-square' : 'square'}
                                color={isActive ? '#fff' : theme.border}
                                size={20}
                                style={styles.checkIcon}
                            />
                            <Text style={isActive ? styles.activeItemText : null}>{ option }</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

CheckList.displayName = 'CheckList'

const styles = StyleSheet.create({
    item: {
        width,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        position: 'relative',
        alignItems: 'center'
    },
    itemText: {
        width: width - 40
    },
    activeItemText: {
        color: '#fff'
    },
    checkIcon: {
        marginRight: 10
    }
})
