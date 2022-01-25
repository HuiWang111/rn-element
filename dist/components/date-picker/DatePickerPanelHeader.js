import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../hooks';
const { width } = Dimensions.get('window');
export const DatePickerPanelHeader = ({ year, month, onNextMonth, onNextYear, onPreviousMonth, onPreviousYear }) => {
    const theme = useTheme();
    return (React.createElement(View, { style: [styles.container, { borderBottomColor: theme.border, borderBottomWidth: 1 }] },
        React.createElement(View, { style: styles.beside },
            React.createElement(Icon, { name: 'doubleleft', onPress: () => onPreviousYear(), style: styles.icon }),
            React.createElement(Icon, { name: 'left', onPress: () => onPreviousMonth(), style: [styles.icon, { marginLeft: 10 }] })),
        React.createElement(View, { style: styles.center },
            React.createElement(Text, { style: styles.numberText }, year),
            React.createElement(Text, null, "\u5E74"),
            React.createElement(Text, { style: [styles.numberText, { marginLeft: 10 }] }, month + 1),
            React.createElement(Text, null, "\u6708")),
        React.createElement(View, { style: [styles.beside, styles.right] },
            React.createElement(Icon, { name: 'doubleright', onPress: () => onNextYear(), style: styles.icon }),
            React.createElement(Icon, { name: 'right', onPress: () => onNextMonth(), style: [styles.icon, { marginRight: 10 }] }))));
};
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
});
