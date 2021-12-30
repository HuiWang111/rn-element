import React, { FC, useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { ITableProps, Data } from './interface'
import { TableHead } from './TableHead'
import { TableRow } from './TableRow'
import { useTheme, useArrowUp, useArrowDown } from '../../hooks'
import { isUndefined } from '../../utils'
import { Empty } from '../base'

const { width } = Dimensions.get('window')

export const Table: FC<ITableProps> = ({
    highlightColor: hColor,
    highlightable = false,
    dataSource = [],
    columns,
    containerStyle,
    tableBodyHeight,
    expandable,
    rowSelection,
    tableHeadBackgroundColor = '#fff',
    rowKey,
    onRowEnter
}: ITableProps) => {
    const theme = useTheme()
    const [highlight, setHighlight] = useState<number>(highlightable ? 0 : -1)
    const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
        if (!rowSelection) {
            return []
        }

        return rowSelection.selectedRowKeys || rowSelection.defaultSelectedRowKeys || []
    })
    const scrollViewRef = useRef<ScrollView>(null)
    const highlightColor = hColor || theme.primary
    const lastIndex = dataSource.length - 1
    const selectionType = rowSelection
        ? (rowSelection.type ?? 'checkbox')
        : undefined

    useArrowUp(() => {
        if (!highlightable) {
            return
        }

        if (highlight === 0) {
            scrollViewRef.current?.scrollToEnd()
            setHighlight(lastIndex)
        } else {
            setHighlight(highlight - 1)
        }
    }, [highlight])

    useArrowDown(() => {
        if (!highlightable) {
            return
        }

        if (highlight === lastIndex) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true })
            setHighlight(0)
        } else {
            setHighlight(highlight + 1)
        }
    }, [highlight, highlightable])

    useEffect(() => {
        setSelectedKeys(rowSelection?.selectedRowKeys ?? [])
    }, [rowSelection?.selectedRowKeys])
    
    if (!columns || columns.length === 0) {
        return null
    }

    const getRowKey = (record: Data): string => {
        if (rowKey) {
            return rowKey(record)
        }

        return String(record.id)
    }

    return (
        <View
            style={[
                styles.container,
                { borderColor: theme.border, borderWidth: 1 },
                containerStyle
            ]}
        >
            <TableHead
                columns={columns}
                backgroundColor={tableHeadBackgroundColor}
                selectionType={selectionType}
                onSelect={(checked) => {
                    if (!rowSelection || !rowSelection.selectedRowKeys) {
                        if (checked) {
                            setSelectedKeys(dataSource.map(getRowKey))
                        } else {
                            setSelectedKeys([])
                        }
                    } else if (rowSelection.onChange) {
                        if (checked) {
                            rowSelection.onChange(dataSource.map(getRowKey))
                        } else {
                            rowSelection.onChange([])
                        }
                    }
                }}
            />
            <ScrollView ref={scrollViewRef} style={{ height: tableBodyHeight }}>
                {
                    dataSource.length
                        ? dataSource.map((record, index) => {
                            const key = getRowKey(record)
    
                            return (
                                <TableRow
                                    key={key}
                                    columns={columns}
                                    data={record}
                                    expandable={expandable}
                                    selectedKeys={selectedKeys}
                                    identifer={key}
                                    selectionType={selectionType}
                                    style={{
                                        borderTopColor: theme.border,
                                        borderTopWidth: index === 0 ? 0 : 1,
                                        backgroundColor: highlight === index
                                            ? highlightColor
                                            : undefined
                                    }}
                                    onEnter={onRowEnter}
                                    onPress={() => {
                                        if (highlightable) {
                                            setHighlight(index)
                                        }
                                    }}
                                    onSelect={(type, checked) => {
                                        const keys: string[] = checked
                                            ? [...selectedKeys, key]
                                            : selectedKeys.filter(k => k !== key)
    
                                        if (!rowSelection) {
                                            if (type === 'radio') {
                                                setSelectedKeys([key])
                                            } else {
                                                setSelectedKeys(keys)
                                            }
                                            return
                                        }
    
                                        const { selectedRowKeys, onChange } = rowSelection
    
                                        if (type === 'radio') {
                                            if (isUndefined(selectedRowKeys)) {
                                                setSelectedKeys([key])
                                            } else {
                                                onChange?.([key])
                                            }
                                            return
                                        }
    
                                        if (isUndefined(selectedRowKeys)) {
                                            setSelectedKeys(keys)
                                        } else {
                                            onChange?.(keys)
                                        }
                                    }}
                                />
                            )
                        })
                        : <Empty style={{ height: tableBodyHeight }} />
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: '#fff'
    }
})
