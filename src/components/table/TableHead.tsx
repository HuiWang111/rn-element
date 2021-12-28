import React, { FC, ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ITableHeadProps, ITableColumn } from './interface'
import { isString } from '../../utils'
import { useTheme } from '../../hooks'
import { Checkbox } from '../checkbox'

export const TableHead: FC<ITableHeadProps> = ({
    columns,
    backgroundColor,
    onSelect
}: ITableHeadProps) => {
    const theme = useTheme()

    const renderCell = (column: ITableColumn): ReactNode => {
        if (column.type === 'radio') {
            return null
        } else if (column.type === 'checkbox') {
            return <Checkbox onChange={onSelect} />
        } else if (isString(column.title)) {
            return <Text style={[styles.cellText, { textAlign: column.align || 'center' }]}>{column.title}</Text>
        } 
        return column.title
    }

    return (
        <View
            style={[
                styles.container,
                {
                    borderBottomColor: theme.border,
                    borderBottomWidth: 1,
                    backgroundColor
                }
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
                            { renderCell(column) }
                        </View>
                    )
                })
            }
        </View>
    )
}

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
})
