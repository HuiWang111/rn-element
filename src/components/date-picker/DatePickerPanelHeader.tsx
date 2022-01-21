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
            <View style={styles.beside}>
                <Icon
                    name='doubleleft'
                    onPress={() => onPreviousYear()}
                    style={styles.icon}
                />
                <Icon
                    name='left'
                    onPress={() => onPreviousMonth()}
                    style={[styles.icon, { marginLeft: 10 }]}
                />
            </View>
            <View style={styles.center}>
                <Text style={styles.numberText}>{year}</Text>
                <Text>年</Text>
                <Text style={[styles.numberText, { marginLeft: 10 }]}>{month + 1}</Text>
                <Text>月</Text>
            </View>
            <View style={[styles.beside, styles.right]}>
                <Icon
                    name='doubleright'
                    onPress={() => onNextYear()}
                    style={styles.icon}
                />
                <Icon
                    name='right'
                    onPress={() => onNextMonth()}
                    style={[styles.icon, { marginRight: 10 }]}
                />
            </View>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width,
        height: 40,
        flexGrow: 0
    },
    beside: {
        flexDirection: 'row',
        flexBasis: 100,
        flexGrow: 0,
        flexShrink: 0,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    right: {
        flexDirection: 'row-reverse'
    },
    center: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: '#00000040',
        fontSize: 20
    },
    numberText: {
        fontWeight: '600'
    }
})
