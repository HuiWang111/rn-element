import { StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { isArray } from './validate'

type StyleUtils = Record<string, ViewStyle>

function createPercentStyleUtils(): StyleUtils {
    const spans = 24
    const percentStyleUtils: StyleUtils = {}
    const widthPrefix = 'span-'
    const marginPrefix = 'offset-'
    const percentBase = 100/spans

    for (let i = 1; i <= spans; i++) {
        percentStyleUtils[widthPrefix + i] = {
            width: percentBase * i + '%'
        }
        percentStyleUtils[marginPrefix + i] = {
            marginLeft: percentBase * i + '%'
        }
    }
    
    return percentStyleUtils
}

export const styleUtils = StyleSheet.create({
    ...createPercentStyleUtils()
})

export function mergeStyle(style1?: StyleProp<ViewStyle> | null, style2?: StyleProp<ViewStyle> | null): StyleProp<ViewStyle> | null {
    if (!style1 && !style2) {
        return null
    }
    if (!style1) {
        return isArray(style2) 
            ? style2.reduce<ViewStyle>((style: ViewStyle, item: ViewStyle) => {
                return Object.assign(style, item)
            }, {})
            : style2 || null
    }
    if (!style2) {
        return isArray(style1) 
            ? style1.reduce<ViewStyle>((style: ViewStyle, item: ViewStyle) => {
                return Object.assign(style, item)
            }, {})
            : style1
    }

    const firstStyle = isArray(style1) 
        ? style1.reduce<ViewStyle>((style: ViewStyle, item: ViewStyle) => {
            return Object.assign(style, item)
        }, {})
        : style1
    const secondStyle = isArray(style2) 
        ? style2.reduce<ViewStyle>((style: ViewStyle, item: ViewStyle) => {
            return Object.assign(style, item)
        }, {})
        : style2

    return {
        ...(firstStyle as object),
        ...(secondStyle as object)
    }
}
