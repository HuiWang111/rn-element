import { StyleSheet } from 'react-native';
import { isArray } from './validate';
function createPercentStyleUtils() {
    const spans = 24;
    const percentStyleUtils = {};
    const widthPrefix = 'span-';
    const marginPrefix = 'offset-';
    const percentBase = 100 / spans;
    for (let i = 1; i <= spans; i++) {
        percentStyleUtils[widthPrefix + i] = {
            width: percentBase * i + '%'
        };
        percentStyleUtils[marginPrefix + i] = {
            marginLeft: percentBase * i + '%'
        };
    }
    return percentStyleUtils;
}
export const styleUtils = StyleSheet.create(Object.assign({}, createPercentStyleUtils()));
export function mergeStyle(style1, style2) {
    if (!style1 && !style2) {
        return null;
    }
    if (!style1) {
        return isArray(style2)
            ? style2.reduce((style, item) => {
                return Object.assign(style, item);
            }, {})
            : style2 || null;
    }
    if (!style2) {
        return isArray(style1)
            ? style1.reduce((style, item) => {
                return Object.assign(style, item);
            }, {})
            : style1;
    }
    const firstStyle = isArray(style1)
        ? style1.reduce((style, item) => {
            return Object.assign(style, item);
        }, {})
        : style1;
    const secondStyle = isArray(style2)
        ? style2.reduce((style, item) => {
            return Object.assign(style, item);
        }, {})
        : style2;
    return Object.assign(Object.assign({}, firstStyle), secondStyle);
}
