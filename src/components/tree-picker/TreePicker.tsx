import React, { FC, useState, useMemo, useRef } from 'react'
import { Text } from 'react-native'
import { ITreePickerProps, IOption, IOnSearchProps } from './interface'
import { PickerPanel } from '../picker-panel'
import { getDepth, getListByDepth } from './utils'
import { isArray } from '../../utils'

const PickerPanelItem = PickerPanel.Item

export const TreePicker: FC<ITreePickerProps> = ({
    value: propsValue,
    options = [],
    title,
    onConfirm,
    onCancel,
    ...restProps
}: ITreePickerProps) => {
    const [value, setValue] = useState<string[]>(propsValue ?? [])
    const labels = useRef<string[]>([])
    const [activeDepth, setActiveDepth] = useState<number>(0)
    const [keyword, setKeyword] = useState<string>('')

    /**
     * 计算 options 有多少层
     * 外部更新 options 需要遵循 immutable 原则
     */
    const depth = useMemo<number>(() => getDepth(options), [options])
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1]
    }, [activeDepth, depth])

    /**
     * TODO: 有待优化
     * 获取当前显示的list
     */
    const list = useMemo<IOption[]>(() => {
        return getListByDepth(activeDepth, options, value, keyword)
    }, [activeDepth, options, value, keyword])

    const onSearchProps = useMemo<IOnSearchProps>(() => {
        if (!restProps.showSearch) {
            return {}
        }

        return {
            onSearch: (val) => {
                setKeyword(val)
            }
        }
    }, [restProps.showSearch])
    
    return (
        <PickerPanel
            { ...restProps }
            { ...onSearchProps }
            value={value[activeDepth]}
            title={isArray(title) ? title[activeDepth] : title}
            onConfirm={v => {
                labels.current[activeDepth] = list.find(i => i.value === v)?.label || ''

                const newValue = [...value]
                newValue[activeDepth] = v
                setValue(newValue)

                if (isLastDepth) {
                    onConfirm?.([...newValue], [...labels.current])
                } else {
                    setActiveDepth(activeDepth + 1)
                }
            }}
            onCancel={() => {
                labels.current = labels.current.splice(activeDepth, 1)

                const newValue = [...value]
                newValue.splice(activeDepth, 1)
                setValue(newValue)

                if (isFirstDepth) {
                    onCancel?.()
                } else {
                    setActiveDepth(activeDepth - 1)
                }
            }}
            footerProps={{
                cancelText: isFirstDepth ? undefined : '上一步',
                confirmText: isLastDepth ? undefined : '下一步'
            }}
        >
            {
                list.map(item => {
                    return (
                        <PickerPanelItem
                            value={item.value}
                            key={item.value}
                        >
                            <Text>{item.label}</Text>
                        </PickerPanelItem>
                    )
                })
            }   
        </PickerPanel>
    )
}

TreePicker.displayName = 'TreePicker'
