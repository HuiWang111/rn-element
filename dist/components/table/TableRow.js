import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { isFunction, isString } from '../../utils';
import { Checkbox } from '../checkbox';
import { Radio } from '../radio';
import { Enterable } from '../enterable';
export const TableRow = ({ columns, style, data, expandable, identifer, selectedKeys, selectionType, onSelect, onPress, onEnter }) => {
    var _a, _b;
    const theme = useTheme();
    const isHighlight = Boolean(style === null || style === void 0 ? void 0 : style.backgroundColor);
    let rowExpandable;
    if (expandable) {
        rowExpandable = (_b = (_a = expandable.rowExpandable) === null || _a === void 0 ? void 0 : _a.call(expandable, data)) !== null && _b !== void 0 ? _b : true;
    }
    else {
        rowExpandable = false;
    }
    const renderSelectionCell = (type) => {
        if (type === 'radio') {
            return (React.createElement(Radio, { onChange: (checked) => onSelect(type, checked), checked: selectedKeys.includes(identifer) }));
        }
        return (React.createElement(Checkbox, { onChange: (checked) => onSelect(type, checked), checked: selectedKeys.includes(identifer) }));
    };
    const renderCell = (column, index) => {
        const text = data[column.dataIndex];
        if (isFunction(column.render)) {
            const renderRes = column.render(text, data, index);
            if (isString(renderRes)) {
                return (React.createElement(Text, { style: [
                        styles.cellText,
                        { textAlign: column.align || 'center', color: isHighlight ? '#fff' : undefined }
                    ] }, renderRes));
            }
            return renderRes;
        }
        return (React.createElement(Text, { style: [
                styles.cellText,
                { textAlign: column.align || 'center', color: isHighlight ? '#fff' : undefined }
            ] }, text));
    };
    const renderExpandRow = (shouldExpand) => {
        if (!shouldExpand) {
            return null;
        }
        const renderRes = expandable.expandedRowRender(data);
        let rowConent;
        if (isString(renderRes)) {
            rowConent = React.createElement(Text, { style: { color: isHighlight ? '#fff' : undefined } }, renderRes);
        }
        else {
            rowConent = renderRes;
        }
        return (React.createElement(View, { style: [
                styles.expandRow,
                {
                    borderTopColor: theme.border,
                    borderTopWidth: 1,
                    backgroundColor: !isHighlight ? (expandable.backgroundColor || '#fff') : undefined
                }
            ] }, rowConent));
    };
    return (React.createElement(Enterable, { isEnterable: isHighlight, onEnter: () => onEnter === null || onEnter === void 0 ? void 0 : onEnter(identifer) },
        React.createElement(TouchableOpacity, { onPress: onPress, style: [styles.container, style] },
            React.createElement(View, { style: [
                    styles.row
                ] },
                selectionType ? (React.createElement(View, { style: [
                        styles.cell,
                        { flexBasis: 30, flexGrow: 0 }
                    ] }, renderSelectionCell(selectionType)))
                    : null,
                columns.map((column, index) => {
                    return (React.createElement(View, { key: column.dataIndex, style: [
                            styles.cell,
                            { borderLeftColor: theme.border, borderLeftWidth: !selectionType && index === 0 ? 0 : 1 },
                            column.style
                        ] }, renderCell(column, index)));
                })),
            renderExpandRow(rowExpandable))));
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        minHeight: 30
    },
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        flex: 1
    },
    cellText: {
        flex: 1
    },
    expandRow: {
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});
