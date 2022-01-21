import React, { FC, useEffect, useState, useMemo } from 'react'
import { RootSiblingPortal } from 'react-native-root-siblings'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { View, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import { PickerFooter, Mask } from '../base'
import { IDatePickerPanelProps, IDateInformation } from './interface'
import { DatePickerPanelHeader } from './DatePickerPanelHeader'
import { WEEKS } from './constants'
import { useTheme } from '../../hooks'
import { getPanelDays } from './utils'

const { width, height } = Dimensions.get('window')
const dayViewWidth = (width - 21) / 7

export const DatePickerPanel: FC<IDatePickerPanelProps<Dayjs>> = ({
    zIndex,
    visible,
    maskStyle,
    value: propsValue,
    onCancel,
    onConfirm,
    onDateChange
}: IDatePickerPanelProps<Dayjs>) => {
    const [value, setValue] = useState<Dayjs>(propsValue ?? dayjs())
    const theme = useTheme()
    const [year, month] = useMemo<[number, number]>(() => {
        return [value.year(), value.month()]
    }, [value])
    const days = useMemo<IDateInformation[]>(() => {
        return getPanelDays(year, month)
    }, [year, month])

    useEffect(() => {
        setValue(propsValue ?? dayjs())
    }, [propsValue])

    const handleConfirm = () => {
        setValue(dayjs())
        onConfirm?.()
    }
    const handleCancel = () => {
        setValue(propsValue ?? dayjs())
        onCancel?.()
    }
    const handleNextMonth = () => {
        setValue(value.add(1, 'month'))
    }
    const handlePreviousMonth = () => {
        setValue(value.subtract(1, 'month'))
    }
    const handleNextYear = () => {
        setValue(value.add(1, 'year'))
    }
    const handlePreviousYear = () => {
        setValue(value.subtract(1, 'year'))
    }
    
    return (
        <RootSiblingPortal>
            <Mask
                zIndex={zIndex}
                style={maskStyle}
                visible={visible}
            >
                <View style={styles.container}>
                    <DatePickerPanelHeader
                        year={year}
                        month={month}
                        onNextMonth={handleNextMonth}
                        onNextYear={handleNextYear}
                        onPreviousMonth={handlePreviousMonth}
                        onPreviousYear={handlePreviousYear}
                    />
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.panelBodyHeader}>
                            {
                                WEEKS.map(text => {
                                    return (
                                        <View key={text} style={styles.dayView}>
                                            <Text>{text}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.panelBodyContent}>
                            {
                                days.map(day => {
                                    const isActive = day.format === value.format('YYYY-MM-DD')

                                    return (
                                        <TouchableOpacity
                                            key={day.format}
                                            style={[
                                                styles.dayView,
                                                isActive ? { backgroundColor: theme.primary } : null
                                            ]}
                                            onPress={() => {
                                                setValue(dayjs(day.format))
                                                onDateChange?.(day.date)
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.dateText,
                                                    isActive ? styles.activeDateText : null,
                                                    day.isCurrentMonth ? null : { color: theme.disabledText }
                                                ]}
                                            >
                                                {day.date}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <PickerFooter
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                        confirmText='今天'
                    />
                </View>
            </Mask>
        </RootSiblingPortal>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: '#fff',
        marginTop: 25
    },
    scrollView: {
        /**
         * - header高度 - footer高度
         */
        height: height - 40 - 50 - 25,
        flexGrow: 0,
        paddingHorizontal: 10
    },
    dayView: {
        flexBasis: dayViewWidth,
        flexGrow: 0,
        flexShrink: 0,
        height: dayViewWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },
    dateText: {},
    activeDateText: {
        color: '#fff'
    },
    panelBodyHeader: {
        flexDirection: 'row'
    },
    panelBodyContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
