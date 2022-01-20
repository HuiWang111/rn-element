import React, { FC } from 'react'
import { RootSiblingPortal } from 'react-native-root-siblings'
import { View, Dimensions, StyleSheet, ScrollView, Text } from 'react-native'
import { PickerFooter, Mask } from '../base'
import { IDatePickerPanelProps } from './interface'
import { DatePickerPanelHeader } from './DatePickerPanelHeader'
import { WEEKS } from './constants'

const { width, height } = Dimensions.get('window')
const dayViewWidth = (width - 20) / 7

export const DatePickerPanel: FC<IDatePickerPanelProps> = ({
    zIndex,
    days,
    visible,
    maskStyle,
    onCancel,
    onConfirm,
    ...restProps
}: IDatePickerPanelProps) => {
    return (
        <RootSiblingPortal>
            <Mask
                zIndex={zIndex}
                style={maskStyle}
                visible={visible}
            >
                <View style={styles.container}>
                    <DatePickerPanelHeader { ...restProps } />
                    <ScrollView style={styles.scrollView}>
                        {
                            WEEKS.map(text => {
                                return (
                                    <View key={text} style={styles.dayView}>
                                        <Text>{text}</Text>
                                    </View>
                                )
                            })
                        }
                        {
                            days.map(day => {
                                return (
                                    <View key={day.format} style={styles.dayView}>
                                        <Text>{day.date}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <PickerFooter
                        onCancel={onCancel}
                        onConfirm={onConfirm}
                    />
                </View>
            </Mask>
        </RootSiblingPortal>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height
    },
    scrollView: {
        /**
         * - header高度 - footer高度 - padding
         */
        height: height - 40 - 50 - 20 - 30,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    dayView: {
        flexBasis: dayViewWidth,
        flexGrow: 0,
        flexShrink: 0,
        height: dayViewWidth,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
