import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { isString } from '../../utils';
import { useTheme } from '../../hooks';
import { Checkbox } from '../checkbox';
export const TableHead = ({ columns, backgroundColor, selectionType, onSelect }) => {
    const theme = useTheme();
    const renderSelectionCell = (type) => {
        if (type === 'radio') {
            return null;
        }
        return React.createElement(Checkbox, { onChange: onSelect });
    };
    const renderCell = (column) => {
        if (isString(column.title)) {
            return React.createElement(Text, { style: [styles.cellText, { textAlign: column.align || 'center' }] }, column.title);
        }
        return column.title;
    };
    return (React.createElement(View, { style: [
            styles.container,
            {
                borderBottomColor: theme.border,
                borderBottomWidth: 1,
                backgroundColor
            }
        ] },
        selectionType ? (React.createElement(View, { style: [
                styles.cell,
                { flexBasis: 30, flexGrow: 0 }
            ] }, renderSelectionCell(selectionType))) : null,
        columns.map((column, index) => {
            return (React.createElement(View, { key: column.dataIndex, style: [
                    styles.cell,
                    { borderLeftColor: theme.border, borderLeftWidth: index === 0 ? 0 : 1 },
                    column.style
                ] }, renderCell(column)));
        })));
};
TableHead.displayName = 'TableHead';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        flex: 1
    },
    cellText: {
        flex: 1,
        fontWeight: 'bold'
    }
});
