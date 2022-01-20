import React, { FC } from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import { IDatePickerPanelHeaderProps } from './interface'
import Icon from 'react-native-vector-icons/AntDesign'
import { useTheme } from '../../hooks'

const { width } = Dimensions.get('window')

export const DatePickerPanelHeader: FC<IDatePickerPanelHeaderProps> = ({
    year,
    month,
    onNextMonth,
    onNextYear,
    onPreviousMonth,
    onPreviousYear
}: IDatePickerPanelHeaderProps) => {
    const theme = useTheme()

    return (
        <View style={[styles.container, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
            <View style={styles.left}>
                <Icon name='doubleleft' onPress={() => onPreviousYear(year - 1)} />
                <Icon name='left' onPress={() => onPreviousMonth(month - 1)} />
            </View>
            <View style={styles.center}>
                <Text style={styles.numberText}>{year}</Text>
                <Text>年</Text>
                <Text style={[styles.numberText, { marginLeft: 10 }]}>{month}</Text>
                <Text>月</Text>
            </View>
            <View style={styles.right}>
                <Icon name='right' onPress={() => onNextMonth(month + 1)} />
                <Icon name='doubleright' onPress={() => onNextYear(year + 1)} />
            </View>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width,
        height: 40
    },
    left: {
        flexDirection: 'row'
    },
    center: {
        flexDirection: 'row'
    },
    right: {
        flexDirection: 'row'
    },
    icon: {
        color: '#00000040'
    },
    numberText: {
        fontWeight: '600'
    }
})
