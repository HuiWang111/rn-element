/**
 * 组件props默认值保持相同的引用可以保证在hooks不引起无限循环
 */
import { KeyCode } from '../constants'

export function defaultPickerLabelRender(labels: string[]) {
    return labels.join(' / ')
}

export function defaultFilterOption(
    keyword: string,
    option: { label: string, value: string, }
) {
    return option.label.includes(keyword)
}

export const defaultArray = []

export const defaultObject = {}

export const defaultPageFnKeyMap = {
    F1: KeyCode.Z,
    F2: KeyCode.X,
    F3: KeyCode.C,
    F4: KeyCode.V
}
