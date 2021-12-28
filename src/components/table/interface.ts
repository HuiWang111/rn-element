import { ViewStyle } from 'react-native'
import { ReactNode } from 'react'

export type Data = Record<string | symbol, any>;

export interface IExpandable {
    backgroundColor?: string;
    expandedRowRender: (record: Data) => ReactNode;
    rowExpandable?: (record: Data) => boolean;
}

export interface IRowSelection {
    selectedRowKeys?: string[];
    defaultSelectedRowKeys?: string[];
    onChange?: (selectedRowKeys: string[]) => void;
    onSelectAll?: (selectedRowKeys: string[]) => void;
}

export interface ITableColumn {
    dataIndex: string;
    title: string | ReactNode;
    style?: ViewStyle | ViewStyle[];
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
    type?: 'normal' | 'checkbox' | 'radio';
    render?: (text: any, record: Data, index: number) => any;
}

export interface ITableProps {
    highlightable?: boolean;
    highlightColor?: string;
    dataSource?: Data[];
    columns: ITableColumn[];
    containerStyle?: ViewStyle;
    tableBodyHeight?: number | string | undefined;
    expandable?: IExpandable;
    rowSelection?: IRowSelection;
    tableHeadBackgroundColor?: string;
    rowKey?: (record: Data) => string;
    onRowEnter?: (rowKey: string) => void;
}

export interface ITableHeadProps {
    columns: ITableColumn[];
    backgroundColor: string;
    onSelect: (checked: boolean) => void;
}

export interface ITableRowProps {
    columns: ITableColumn[];
    style?: ViewStyle;
    data: Data;
    expandable?: IExpandable;
    selectedKeys: string[];
    identifer: string;
    onPress?: () => void;
    onSelect: (type: 'radio' | 'checkbox', checked: boolean) => void;
    onEnter?: (rowKey: string) => void;
}
