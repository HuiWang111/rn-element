import React, { FC, ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ITableHeadProps, ITableColumn, SelectionType } from './interface'
import { isString } from '../../utils'
import { useTheme } from '../../hooks'
import { Checkbox } from '../checkbox'

export const TableHead: FC<ITableHeadProps> = ({
    columns,
    backgroundColor,
    selectionType,
    onSelect
}: ITableHeadProps) => {
    const theme = useTheme()

    const renderSelectionCell = (type: SelectionType) => {
        if (type === 'radio') {
            return null
        }

        return <Checkbox onChange={onSelect} />
    }
    const renderCell = (column: ITableColumn): ReactNode => {
        if (isString(column.title)) {
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
                selectionType ? (
                    <View
                        style={[
                            styles.cell,
                            { flexBasis: 30, flexGrow: 0 }
                        ]}
                    >
                        { renderSelectionCell(selectionType) }
                    </View>
                ) : null
            }
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

TableHead.displayName = 'TableHead'

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
