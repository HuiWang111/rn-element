import { StyleSheet, ViewStyle } from 'react-native'

type StyleUtils = Record<string, ViewStyle>

function createPercentStyleUtils(): StyleUtils {
    const spans = 24;
    const percentStyleUtils: StyleUtils = {}
    const widthPrefix = 'span-';
    const marginPrefix = 'offset-';
    const percentBase = 100/spans;

    for (let i = 1; i <= spans; i++) {
        percentStyleUtils[widthPrefix + i] = {
            width: percentBase * i + '%'
        }
        percentStyleUtils[marginPrefix + i] = {
            marginLeft: percentBase * i + '%'
        }
    }
    
    return percentStyleUtils;
}

export const styleUtils = StyleSheet.create({
    ...createPercentStyleUtils()
})
