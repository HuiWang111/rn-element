import React, { FC, useState, useRef, useMemo } from 'react'
import { Text, TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { PickerPanel } from '../picker-panel'
import { IAsyncTreePickerProps } from './interface'
import { isArray } from '../../utils'
import { useVisible } from '../../hooks'
import { PickerInput } from '../base'

/**
 * TODO: AsyncTreePicker暂不支持默认值得label
 * 目前设置了默认值只会展示对应的value
 */
export const AsyncTreePicker: FC<IAsyncTreePickerProps> = ({
    value: propsValue,
    defaultValue,
    depth,
    title,
    options = [],
    onChange,
    onNext,
    onPrevious,
    onFocus,
    panelProps,
    ...restProps
}: IAsyncTreePickerProps) => {
    const [labels, setLabels] = useState(defaultValue ?? propsValue ?? [])
    const [panelValue, setPanelValue] = useState(defaultValue ?? propsValue ?? [])
    const [visible, showPanel, hidePanel] = useVisible()
    const [activeDepth, setActiveDepth] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef<TextInput | null>(null)
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1]
    }, [activeDepth, depth])
    // const getLabels = useCallback((val?: string[]) => {
    //     if (!val || !val.length) {
    //         return []
    //     }

    //     const labels = val.slice(0, val.length - 1)
    //     const lastValue = val[val.length - 1]
    //     const label = options.find(o => o.value === lastValue)?.label ?? lastValue
    //     labels.push(label)
    //     return labels
    // }, [options])

    // useEffect(() => {
    //     setLabels(getLabels(propsValue))
    // }, [getLabels, propsValue])

    const handleInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        inputRef.current?.blur()
        showPanel()
        onFocus?.(e)
    }
    const handleConfirm = async (v: string) => {
        if (loading) {
            return
        }

        const newValue = [...panelValue]
        newValue[activeDepth] = v

        const newActiveDepth = activeDepth + 1

        const newLabels = [...labels]
        newLabels[activeDepth] = options.find(o => o.value === v)?.label ?? v
        setLabels(newLabels)

        if (isLastDepth) {
            // if (isUndefined(propsValue)) {
            //     setLabels(getLabels(newValue))
            // }
            onChange?.(newValue)
            hidePanel()
        } else {
            setLoading(true)
            setPanelValue(newValue)
            await onNext?.(v, newActiveDepth, newValue)
            setActiveDepth(newActiveDepth)
            setLoading(false)
        }
    }
    const handleCancel = async () => {
        if (loading) {
            return
        }

        const newValue = [...panelValue]
        newValue.splice(activeDepth, 1)

        const newActiveDepth = activeDepth - 1

        if (isFirstDepth) {
            panelProps?.onCancel?.()
            hidePanel()
        } else {
            setPanelValue(newValue)
            setLoading(true)
            await onPrevious?.(newActiveDepth)
            setLoading(false) 
            setActiveDepth(newActiveDepth)
        }
    }

    return (
        <>
            <PickerInput
                clearable={false}
                { ...restProps }
                value={labels}
                onFocus={handleInputFocus}
                ref={inputRef}
                showSoftInputOnFocus={false}
                onClear={() => onChange?.([])}
            />
            <PickerPanel
                { ...panelProps }
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
                    options.map(option => {
                        const { label, value: val } = option

                        return (
                            <PickerPanel.Item
                                key={val}
                                value={val}
                            >
                                <Text>{label}</Text>
                            </PickerPanel.Item>
                        )
                    })
                }
            </PickerPanel>
        </>
    )
}
