import React, { FC, ReactText, useState } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { ITreePickerProps, IOption } from './interface';
import { Mask, PickerFooter } from '../base';
import { getDefaultValue, getDefaultColumns } from './utils';
import { TreePickerItem } from './TreePickerItem';
import { useArrowDown, useArrowLeft, useArrowRight, useArrowUp } from '../../hooks';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const containerWidth = screenWidth - 40;
const containerHeight = screenHeight - 90;

export const TreePicker: FC<ITreePickerProps> = ({
    zIndex,
    maskStyle,
    itemStyle,
    activeItemStyle,
    unfocusActiveItemStyle,
    value: propsValue,
    visible = false,
    options = [],
    onCancel,
    onConfirm
}: ITreePickerProps) => {
    const [value, setValue] = useState<ReactText[]>(propsValue || getDefaultValue(options));
    const [activeColumn, setActiveColumn] = useState(0);
    const [columns, setColumns] = useState(getDefaultColumns(options));
    const maxColumnIndex = columns.length - 1;
    const currentColumnList = columns[activeColumn];
    const currentColumnListMaxIndex = currentColumnList.length - 1;

    useArrowRight(() => {
        if (activeColumn < maxColumnIndex) {
            setActiveColumn(i => {
                const newIndex = i + 1;

                setColumns(columns => {
                    const cols = [...columns];
                    let selectedOption;

                    if (activeColumn === 0) {
                        selectedOption = options.find(o => o.value === value[activeColumn]);
                    } else if (activeColumn === 1) {
                        options.some(o => {
                            const found = o.children?.find(v => v.value === value[activeColumn]);

                            if (found) {
                                selectedOption = found;
                                return true;
                            }
                            return false;
                        });
                    }

                    if (selectedOption.children?.length) {
                        const children = selectedOption.children as Omit<IOption, 'childen'>[];
                        cols[newIndex] = children;
                        setValue(val => {
                            const v = [...val];
                            v[newIndex] = children[0].value;
                            return v;
                        });
                    } else if (activeColumn === 0) {
                        cols.length = 1;
                    } else if (activeColumn === 1) {
                        cols.length = 2;
                    }

                    return cols;
                });

                return newIndex;
            });
        }
    }, [activeColumn, maxColumnIndex]);

    useArrowLeft(() => {
        if (activeColumn > 0) {
            setActiveColumn(i => i - 1);
        }
    }, [activeColumn]);

    useArrowDown(() => {
        const index = currentColumnList.findIndex(i => i.value === value[activeColumn]);

        if (index < currentColumnListMaxIndex) {
            setValue(v => {
                const val = [...v];
                val[activeColumn] = currentColumnList[index + 1].value;
                return val;
            });
        }
    }, [value, activeColumn, currentColumnListMaxIndex]);

    useArrowUp(() => {
        const index = currentColumnList.findIndex(i => i.value === value[activeColumn]);

        if (index > 0) {
            setValue(v => {
                const val = [...v];
                val[activeColumn] = currentColumnList[index - 1].value;
                return val;
            });
        }
    }, [value, activeColumn]);
    
    const handleCancel = () => {
        onCancel?.();
    }

    const handleConfirm = () => {
        onConfirm?.(value);
    }

    const handlePressItem = (value: ReactText) => {
        // 
    }
    
    return (
        <Mask
            zIndex={zIndex}
            style={maskStyle}
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.picker}>
                    {
                        columns.map((list, index) => {
                            const isActiveColumn = activeColumn === index;
                            
                            return (
                                <View
                                    key={index}
                                    style={[styles.column, isActiveColumn ? styles.activeColumn : null]}
                                >
                                    <ScrollView style={{ height: containerHeight - 50 }}>
                                        {
                                            list.map(item => {
                                                const isActive = value[index] === item.value;

                                                return (
                                                    <TreePickerItem
                                                        label={item.label}
                                                        key={item.value}
                                                        onPress={() => handlePressItem(item.value)}
                                                        style={[
                                                            itemStyle,
                                                            isActive ? activeItemStyle : null,
                                                            isActive && !isActiveColumn ? unfocusActiveItemStyle : null
                                                        ]}
                                                    />
                                                );
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            );
                        })
                    }
                </View>
                <PickerFooter
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            </View>
        </Mask>
    );
}

const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#fff'
    },
    picker: {
        width: containerWidth,
        height: containerHeight - 50,
        flexDirection: 'row'
    },
    column: {
        flexGrow: 1,
        height: containerHeight - 50
    },
    activeColumn: {
        flexGrow: 2000
    }
});
