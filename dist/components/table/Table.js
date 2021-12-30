import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { useTheme, useArrowUp, useArrowDown } from '../../hooks';
import { isUndefined } from '../../utils';
import { Empty } from '../base';
const { width } = Dimensions.get('window');
export const Table = ({ highlightColor: hColor, highlightable = false, dataSource = [], columns, containerStyle, tableBodyHeight, expandable, rowSelection, tableHeadBackgroundColor = '#fff', rowKey, onRowEnter }) => {
    var _a;
    const theme = useTheme();
    const [highlight, setHighlight] = useState(highlightable ? 0 : -1);
    const [selectedKeys, setSelectedKeys] = useState(() => {
        if (!rowSelection) {
            return [];
        }
        return rowSelection.selectedRowKeys || rowSelection.defaultSelectedRowKeys || [];
    });
    const scrollViewRef = useRef(null);
    const highlightColor = hColor || theme.primary;
    const lastIndex = dataSource.length - 1;
    const selectionType = rowSelection
        ? ((_a = rowSelection.type) !== null && _a !== void 0 ? _a : 'checkbox')
        : undefined;
    useArrowUp(() => {
        var _a;
        if (!highlightable) {
            return;
        }
        if (highlight === 0) {
            (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollToEnd();
            setHighlight(lastIndex);
        }
        else {
            setHighlight(highlight - 1);
        }
    }, [highlight]);
    useArrowDown(() => {
        var _a;
        if (!highlightable) {
            return;
        }
        if (highlight === lastIndex) {
            (_a = scrollViewRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ y: 0, animated: true });
            setHighlight(0);
        }
        else {
            setHighlight(highlight + 1);
        }
    }, [highlight, highlightable]);
    useEffect(() => {
        var _a;
        setSelectedKeys((_a = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys) !== null && _a !== void 0 ? _a : []);
    }, [rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys]);
    if (!columns || columns.length === 0) {
        return null;
    }
    const getRowKey = (record) => {
        if (rowKey) {
            return rowKey(record);
        }
        return String(record.id);
    };
    return (React.createElement(View, { style: [
            styles.container,
            { borderColor: theme.border, borderWidth: 1 },
            containerStyle
        ] },
        React.createElement(TableHead, { columns: columns, backgroundColor: tableHeadBackgroundColor, selectionType: selectionType, onSelect: (checked) => {
                if (!rowSelection || !rowSelection.selectedRowKeys) {
                    if (checked) {
                        setSelectedKeys(dataSource.map(getRowKey));
                    }
                    else {
                        setSelectedKeys([]);
                    }
                }
                else if (rowSelection.onChange) {
                    if (checked) {
                        rowSelection.onChange(dataSource.map(getRowKey));
                    }
                    else {
                        rowSelection.onChange([]);
                    }
                }
            } }),
        React.createElement(ScrollView, { ref: scrollViewRef, style: { height: tableBodyHeight } }, dataSource.length
            ? dataSource.map((record, index) => {
                const key = getRowKey(record);
                return (React.createElement(TableRow, { key: key, columns: columns, data: record, expandable: expandable, selectedKeys: selectedKeys, identifer: key, selectionType: selectionType, style: {
                        borderTopColor: theme.border,
                        borderTopWidth: index === 0 ? 0 : 1,
                        backgroundColor: highlight === index
                            ? highlightColor
                            : undefined
                    }, onEnter: onRowEnter, onPress: () => {
                        if (highlightable) {
                            setHighlight(index);
                        }
                    }, onSelect: (type, checked) => {
                        const keys = checked
                            ? [...selectedKeys, key]
                            : selectedKeys.filter(k => k !== key);
                        if (!rowSelection) {
                            if (type === 'radio') {
                                setSelectedKeys([key]);
                            }
                            else {
                                setSelectedKeys(keys);
                            }
                            return;
                        }
                        const { selectedRowKeys, onChange } = rowSelection;
                        if (type === 'radio') {
                            if (isUndefined(selectedRowKeys)) {
                                setSelectedKeys([key]);
                            }
                            else {
                                onChange === null || onChange === void 0 ? void 0 : onChange([key]);
                            }
                            return;
                        }
                        if (isUndefined(selectedRowKeys)) {
                            setSelectedKeys(keys);
                        }
                        else {
                            onChange === null || onChange === void 0 ? void 0 : onChange(keys);
                        }
                    } }));
            })
            : React.createElement(Empty, { style: { height: tableBodyHeight } }))));
};
const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: '#fff'
    }
});
