import { ReactText } from 'react'
import { IOption, IOptionWithChildren } from './interface'
import { omit } from '../../utils'

export const getDepth = (options: IOptionWithChildren[]): number => {
    if (!options.length) {
        return 0
    }

    let depth = 1
    const recursive = (item: IOptionWithChildren, acc = 1) => {
        depth = Math.max(depth, acc)
        if (item.children && item.children.length) {
            item.children.forEach(c => recursive(c, acc + 1))    
        }
    }

    options.forEach(option => recursive(option))

    return depth
}

export const getListByDepth = (
    depth: number,
    options: IOptionWithChildren[],
    value: ReactText[],
    keyword?: string
): IOption[] => {
    if (depth === 0) {
        const list = options.map(o => omit(o, ['children']) as IOption)

        return keyword
            ? filterList(list, keyword)
            : list
    } else if (depth === 1) {
        const [firstValue] = value
        const firstDepthChildren = options.find(o => o.value === firstValue)?.children
        const list = firstDepthChildren?.map(c => omit(c, ['children']) as IOption) || []

        return keyword
            ? filterList(list, keyword)
            : list
    }

    const [firstValue, secondValue] = value
    const firstDepthChildren = options.find(o => o.value === firstValue)?.children
    const secondDepthChildren = firstDepthChildren?.find(c => c.value === secondValue)?.children
    const list = secondDepthChildren?.map(c => omit(c, ['children']) as IOption) || []
    
    return keyword
        ? filterList(list, keyword)
        : list
}

const filterList = (list: IOption[], keyword: string) => {
    return list.filter(item => item.label.includes(keyword))
}
