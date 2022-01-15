import React, { FC, useContext, useMemo } from 'react'
import { TouchableOpacity, GestureResponderEvent, ViewStyle } from 'react-native'
import { IPickerPanelItem } from './interface'
import { PickerContext } from './context'
import { isFunction } from '../../utils'
import { useTheme } from '../../hooks'

export const PickerItem: FC<IPickerPanelItem> = ({
    style,
    children,
    value,
    isActive,
    onPress
}: IPickerPanelItem) => {
    const theme = useTheme()
    const activeOpacity = 0.7
    const { activeItemStyle, itemStyle, confirmOnSelect, onConfirm } = useContext(PickerContext)
    const handlePress = (e: GestureResponderEvent) => {
        onConfirm?.(value)
        onPress?.(e)

        // if (confirmOnSelect && onConfirm) {
        //     onConfirm(value)
        // }
    }
    const baseStyle = useMemo<ViewStyle>(() => {
        return {
            borderTopColor: theme.border,
            borderTopWidth: 1
        }
    }, [theme.border])

    const containerStyles = [baseStyle, itemStyle]
    if (style) {
        containerStyles.push(style)
    }
    if (isActive && activeItemStyle) {
        containerStyles.push(activeItemStyle)
    }

    const child = isFunction(children) ? children({ isActive }) : children

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            style={containerStyles}
            onPress={handlePress}
        >
            { child }
        </TouchableOpacity>
    )
}

PickerItem.displayName = 'PickerItem'
