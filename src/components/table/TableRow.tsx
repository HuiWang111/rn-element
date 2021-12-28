import React, { FC, ReactNode } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ITableRowProps, ITableColumn } from './interface'
import { useTheme } from '../../hooks'
import { isFunction, isString } from '../../utils'
import { Checkbox } from '../checkbox'
import { Radio } from '../radio'
import { Enterable } from '../enterable'

export const TableRow: FC<ITableRowProps> = ({
    columns,
    style,
    data,
    expandable,
    identifer,
    selectedKeys,
    onSelect,
    onPress,
    onEnter
}: ITableRowProps) => {
    const theme = useTheme()
    const isHighlight = Boolean(style?.backgroundColor)
    let rowExpandable: boolean
    if (expandable) {
        rowExpandable = expandable.rowExpandable?.(data) ?? true
    } else {
        rowExpandable = false
    }
    
    const renderCell = (column: ITableColumn, index: number): ReactNode => {
        const text = data[column.dataIndex];

        if (column.type === 'radio') {
            return <Radio onChange={(checked) => onSelect('radio', checked)} checked={selectedKeys.includes(identifer)} />
        } else if (column.type === 'checkbox') {
            return <Checkbox onChange={(checked) => onSelect('checkbox', checked)} checked={selectedKeys.includes(identifer)} />
        } else if (isFunction(column.render)) {
            const renderRes = column.render(text, data, index)
            
            if (isString(renderRes)) {
                return (
                    <Text
                        style={[
                            styles.cellText,
                            { textAlign: column.align || 'center', color: isHighlight ? '#fff' : undefined }
                        ]}
                    >
                        {renderRes}
                    </Text>
                )
            }
            return renderRes
        }
        return (
            <Text
                style={[
                    styles.cellText,
                    { textAlign: column.align || 'center', color: isHighlight ? '#fff' : undefined }
                ]}
            >
                {text}
            </Text>
        )
    }
    const renderExpandRow = (shouldExpand: boolean) => {
        if (!shouldExpand) {
            return null
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const renderRes = expandable!.expandedRowRender(data)
        let rowConent: ReactNode
        if (isString(renderRes)) {
            rowConent = <Text style={{ color: isHighlight ? '#fff' : undefined }}>{renderRes}</Text>
        } else {
            rowConent = renderRes
        }
        
        return (
            <View
                style={[
                    styles.expandRow,
                    {
                        borderTopColor: theme.border,
                        borderTopWidth: 1,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        backgroundColor: !isHighlight ? (expandable!.backgroundColor || '#fff') : undefined
                    }
                ]}
            >
                { rowConent }
            </View>
        )
    }
    
    return (
        <Enterable isEnterable={isHighlight} onEnter={() => onEnter?.(identifer)}>
            <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
                <View
                    style={[
                        styles.row
                    ]}
                >
                    {
                        columns.map((column, index) => {
                            return (
                                <View
                                    key={column.dataIndex}
                                    style={[
                                        styles.cell,
                                        { borderLeftColor: theme.border, borderLeftWidth: index === 0 ? 0 : 1 },
                                        column.style
                                    ]}
                                >
                                    { renderCell(column, index) }
                                </View>
                            )
                        })
                    }
                </View>
                { renderExpandRow(rowExpandable) }
            </TouchableOpacity>
        </Enterable>
    )
}

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
})
