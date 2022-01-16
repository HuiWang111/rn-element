import React, { FC, useState, useMemo, useRef, useEffect } from 'react'
import { Text, TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { ITreePickerProps, IOption, IOnSearchProps } from './interface'
import { PickerPanel } from '../picker-panel'
import { PickerInput } from '../base'
import { getDepth, getListByDepth } from './utils'
import { isArray, isUndefined } from '../../utils'
import { useVisible } from '../../hooks'

const PickerPanelItem = PickerPanel.Item

export const TreePicker: FC<ITreePickerProps> = ({
    value: propsValue,
    defaultValue,
    options = [],
    title,
    onChange,
    onVisibleChange,
    panelProps,
    ...restProps
}: ITreePickerProps) => {
    const [value, setValue] = useState<string[]>(defaultValue ?? propsValue ?? [])
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange)
    const labels = useRef<string[]>([])
    const [activeDepth, setActiveDepth] = useState<number>(0)
    const [keyword, setKeyword] = useState<string>('')
    const inputRef = useRef<TextInput | null>(null)

    useEffect(() => {
        setValue(propsValue ?? [])
    }, [propsValue])

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
        if (!panelProps?.showSearch) {
            return {}
        }

        return {
            onSearch: (val) => {
                setKeyword(val)
            }
        }
    }, [panelProps?.showSearch])

    const handleInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        inputRef.current?.blur()
        showPanel()
        restProps.onFocus?.(e)
    }
    const handleConfirm = (v: string) => {
        labels.current[activeDepth] = list.find(i => i.value === v)?.label || ''

        const newValue = [...value]
        newValue[activeDepth] = v

        if (isLastDepth) {
            if (isUndefined(propsValue)) {
                setValue(newValue)
            }
            
            onChange?.([...newValue], [...labels.current])
            hidePanel()
        } else {
            setValue(newValue)
            setActiveDepth(activeDepth + 1)
        }
    }
    const handleCancel = () => {
        labels.current = labels.current.splice(activeDepth, 1)

        const newValue = [...value]
        newValue.splice(activeDepth, 1)

        if (isFirstDepth) {
            if (isUndefined(propsValue)) {
                setValue(newValue)
            }
            panelProps?.onCancel?.()
            hidePanel()
        } else {
            setValue(newValue)
            setActiveDepth(activeDepth - 1)
        }
    }
    
    return (
        <>
            <PickerInput
                clearable={false}
                { ...restProps }
                value={value}
                onFocus={handleInputFocus}
                ref={inputRef}
                showSoftInputOnFocus={false}
                onClear={() => onChange?.([], [])}
            />
            <PickerPanel
                { ...panelProps }
                { ...onSearchProps }
                visible={visible}
                value={value[activeDepth]}
                title={isArray(title) ? title[activeDepth] : title}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
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
        </>
    )
}

TreePicker.displayName = 'TreePicker'
