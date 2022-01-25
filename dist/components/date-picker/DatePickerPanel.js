import React, { useEffect, useState, useMemo } from 'react';
import { RootSiblingPortal } from 'react-native-root-siblings';
import dayjs from 'dayjs';
import { View, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { PickerFooter, Mask } from '../base';
import { DatePickerPanelHeader } from './DatePickerPanelHeader';
import { WEEKS } from './constants';
import { useTheme } from '../../hooks';
import { getPanelDays } from './utils';
const { width, height } = Dimensions.get('window');
const dayViewWidth = (width - 21) / 7;
export const DatePickerPanel = ({ zIndex, visible, maskStyle, value: propsValue, onCancel, onConfirm, onDateChange }) => {
    const [value, setValue] = useState(propsValue !== null && propsValue !== void 0 ? propsValue : dayjs());
    const theme = useTheme();
    const [year, month] = useMemo(() => {
        return [value.year(), value.month()];
    }, [value]);
    const days = useMemo(() => {
        return getPanelDays(year, month);
    }, [year, month]);
    useEffect(() => {
        setValue(propsValue !== null && propsValue !== void 0 ? propsValue : dayjs());
    }, [propsValue]);
    const handleConfirm = () => {
        setValue(dayjs());
        onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
    };
    const handleCancel = () => {
        setValue(propsValue !== null && propsValue !== void 0 ? propsValue : dayjs());
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
    };
    const handleNextMonth = () => {
        setValue(value.add(1, 'month'));
    };
    const handlePreviousMonth = () => {
        setValue(value.subtract(1, 'month'));
    };
    const handleNextYear = () => {
        setValue(value.add(1, 'year'));
    };
    const handlePreviousYear = () => {
        setValue(value.subtract(1, 'year'));
    };
    return (React.createElement(RootSiblingPortal, null,
        React.createElement(Mask, { zIndex: zIndex, style: maskStyle, visible: visible },
            React.createElement(View, { style: styles.container },
                React.createElement(DatePickerPanelHeader, { year: year, month: month, onNextMonth: handleNextMonth, onNextYear: handleNextYear, onPreviousMonth: handlePreviousMonth, onPreviousYear: handlePreviousYear }),
                React.createElement(ScrollView, { style: styles.scrollView },
                    React.createElement(View, { style: styles.panelBodyHeader }, WEEKS.map(text => {
                        return (React.createElement(View, { key: text, style: styles.dayView },
                            React.createElement(Text, null, text)));
                    })),
                    React.createElement(View, { style: styles.panelBodyContent }, days.map(day => {
                        const isActive = day.format === value.format('YYYY-MM-DD');
                        return (React.createElement(TouchableOpacity, { key: day.format, style: [
                                styles.dayView,
                                isActive ? { backgroundColor: theme.primary } : null
                            ], onPress: () => {
                                setValue(dayjs(day.format));
                                onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(day.date);
                            } },
                            React.createElement(Text, { style: [
                                    styles.dateText,
                                    isActive ? styles.activeDateText : null,
                                    day.isCurrentMonth ? null : { color: theme.disabledText }
                                ] }, day.date)));
                    }))),
                React.createElement(PickerFooter, { onCancel: handleCancel, onConfirm: handleConfirm, confirmText: '\u4ECA\u5929' })))));
};
const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: '#fff',
        marginTop: 25
    },
    scrollView: {
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
});
