import React, { FC, PropsWithChildren } from 'react'
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'
import { IMaskProps } from './interface'

export const Mask: FC<PropsWithChildren<IMaskProps>> = ({
    zIndex = 10,
    backgroundColor = 'rgba(0, 0, 0, 0.3)',
    style,
    visible = false,
    children
}: PropsWithChildren<IMaskProps>) => {
    if (!visible) return null

    let maskContainerStyles: StyleProp<ViewStyle> = [
        styles.container,
        { zIndex, backgroundColor }
    ]

    if (style) {
        maskContainerStyles = maskContainerStyles.concat(style)
    }
    
    return (
        <View style={maskContainerStyles}>
            { children }
        </View>
    )    
}

Mask.displayName = 'Mask'

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
