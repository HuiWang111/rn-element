import React, { FC, ReactText, useState, useMemo } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { ITreePickerProps, IOption } from './interface';
import { Picker } from '../picker';
import { getDefaultValue, getDefaultColumns, getDepth } from './utils';
import { omit } from '../../utils'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PickerItem = Picker.Item

export const TreePicker: FC<ITreePickerProps> = ({
    value: propsValue,
    options = [],
    onConfirm,
    ...restProps
}: ITreePickerProps) => {
    const [value, setValue] = useState<ReactText[]>(propsValue ?? []);
    const [activeDepth, setActiveDepth] = useState<number>(0)

    /**
     * 计算 options 有多少层
     * 外部更新 options 需要遵循 immutable 原则
     */
    const depth = useMemo<number>(() => getDepth(options), options)
    const [isFirstDepth, isLastDepth] = useMemo(() => {
        return [activeDepth === 0, activeDepth === depth - 1]
    }, [activeDepth, depth])

    /**
     * TODO: 有待优化
     * 获取当前显示的list
     */
    const list = useMemo<IOption[]>(() => {
        if (activeDepth === 0) {
            return options.map(o => omit(o, ['children']) as IOption)
        } else if (activeDepth === 1) {
            const [firstValue, secondValue] = value;
            const firstDepthChildren = options.find(o => o.value === firstValue)!.children
            return firstDepthChildren
                ?.find(o => o.value === secondValue)
                ?.children
                ?.map(c => omit(c, ['children']) as IOption) || []
        }

        const [firstValue, secondValue, thirdValue] = value;
        const firstDepthChildren = options.find(o => o.value === firstValue)!.children
        const secondDepthChildren = firstDepthChildren!.find(c => c.value === secondValue)!.children
        return secondDepthChildren
            ?.find(o => o.value === thirdValue)
            ?.children
            ?.map(c => omit(c, ['children']) as IOption) || []
    }, [activeDepth, options])
    
    return (
        <Picker
            value={value[activeDepth]}
            onConfirm={v => {
                const newValue = [...value]
                newValue[activeDepth] = v
                onConfirm?.(newValue)
            }}
            footerProps={{
                cancelText: isFirstDepth ? undefined : '上一步',
                confirmText: isLastDepth ? undefined : '下一步'
            }}
            { ...restProps }
        >
            
        </Picker>
    );
}

const styles = StyleSheet.create({
    
});
