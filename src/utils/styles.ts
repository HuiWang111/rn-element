import { StyleSheet, ViewStyle } from 'react-native'
import { isArray } from './validate'
import { StyleType } from './interface'

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

export function mergeStyle(style1?: StyleType | null, style2?: StyleType | null): Record<string, unknown> | null {
    if (!style1 && !style2) {
        return null
    }
    if (!style1) {
        return isArray(style2) 
            ? style2.reduce((style: Record<string, unknown>, item: Record<string, unknown>) => {
                return Object.assign(style, item)
            }, {})
            : style2 || null
    }
    if (!style2) {
        return isArray(style1) 
            ? style1.reduce((style: Record<string, unknown>, item: Record<string, unknown>) => {
                return Object.assign(style, item)
            }, {})
            : style1
    }

    const firstStyle = isArray(style1) 
        ? style1.reduce((style: Record<string, unknown>, item: Record<string, unknown>) => {
            return Object.assign(style, item)
        }, {})
        : style1
    const secondStyle = isArray(style2) 
        ? style2.reduce((style: Record<string, unknown>, item: Record<string, unknown>) => {
            return Object.assign(style, item)
        }, {})
        : style2

    return {
        ...firstStyle,
        ...secondStyle
    }
}
