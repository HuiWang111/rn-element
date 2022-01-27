import React, { FC, useState, useMemo, useRef, useEffect, useCallback, forwardRef, useImperativeHandle, RefAttributes, ForwardedRef } from 'react'
import { Text, TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { ITreePickerProps, IOption, IOnSearchProps } from './interface'
import { PickerPanel } from '../picker-panel'
import { PickerInput, IPickerRef } from '../base'
import { getDepth, getListByDepth, getLabelsByValue } from './utils'
import { isArray, isUndefined } from '../../utils'
import { useVisible } from '../../hooks'

const PickerPanelItem = PickerPanel.Item

export const TreePicker: FC<ITreePickerProps & RefAttributes<IPickerRef>> = forwardRef(({
    value: propsValue,
    defaultValue,
    options = [],
    title,
    panelProps,
    onChange,
    onVisibleChange,
    onFocus,
    labelRender = (labels: string[]) => labels.join(' / '),
    filterOption = (k: string, o: IOption) => o.label.includes(k),
    ...restProps
}: ITreePickerProps, ref: ForwardedRef<IPickerRef>) => {
    const [label, setLabel] = useState<string[]>(() => {
        return getLabelsByValue(options, defaultValue ?? propsValue ?? [])
    })
    const [panelValue, setPanelValue] = useState<string[]>(defaultValue ?? propsValue ?? [])
    const [visible, showPanel, hidePanel] = useVisible(false, onVisibleChange)
    const getActiveDepth = useCallback(() => {
        if (!propsValue) {
            return 0
        } else if (!propsValue.length) {
            return 0
        } 
        return propsValue.length - 1
    }, [propsValue])
    const [activeDepth, setActiveDepth] = useState<number>(getActiveDepth)
    const [keyword, setKeyword] = useState<string>('')
    const inputRef = useRef<TextInput | null>(null)

    useEffect(() => {
        setLabel(getLabelsByValue(options, propsValue ?? []))
    }, [propsValue, options])

    useImperativeHandle(ref, () => ({
        blur() {
            inputRef.current?.blur()
        },
        focus() {
            inputRef.current?.focus()
        },
        isFocused() {
            return inputRef.current?.isFocused() || false
        }
    }), [])

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
        return getListByDepth(activeDepth, options, panelValue, filterOption, keyword)
    }, [activeDepth, options, panelValue, keyword, filterOption])

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
        onFocus?.(e)
    }
    const handleConfirm = (v: string) => {
        const newValue = [...panelValue]
        newValue[activeDepth] = v

        if (isLastDepth) {
            if (isUndefined(propsValue)) {
                setLabel(getLabelsByValue(options, newValue))
            }
            
            onChange?.([...newValue])
            hidePanel()
        } else {
            setPanelValue(newValue)
            setActiveDepth(activeDepth + 1)
        }
    }
    const handleCancel = () => {
        const newValue = [...panelValue]
        newValue.splice(activeDepth, 1)
        
        if (isFirstDepth) {
            panelProps?.onCancel?.()
            hidePanel()
            setActiveDepth(getActiveDepth())
            setPanelValue(propsValue ?? [])
        } else {
            setPanelValue(newValue)
            setActiveDepth(activeDepth - 1)
        }
    }
    
    return (
        <>
            <PickerInput
                clearable={false}
                { ...restProps }
                value={labelRender(label)}
                onFocus={handleInputFocus}
                ref={inputRef}
                showSoftInputOnFocus={false}
                onClear={() => onChange?.([])}
            />
            <PickerPanel
                { ...panelProps }
                { ...onSearchProps }
                visible={visible}
                value={panelValue[activeDepth]}
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
})

TreePicker.displayName = 'TreePicker'
