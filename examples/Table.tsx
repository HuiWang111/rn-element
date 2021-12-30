import React, { FC, useState } from 'react'
import { Text } from 'react-native'
import { useHistory } from 'react-router-native'
import { Table, Page } from '../src'

const STATUS = {
    0: '待处理',
    1: '处理中',
    3: '已完成'
}

const dataSource = [
    { id: 1, code: '123', status: 0, group: '2000主剂-2000主剂', time: '5/24 00:00' },
    { id: 2, code: '456', status: 1, group: '2000果汁-2000果汁', time: '5/31 00:00' },
    { id: 3, code: '789', status: 3, group: '2000果肉', time: '8/18 00:00', expandData: '这是拓展行' },
    { id: 4, code: '124', status: 0, group: '2000主剂', time: '5/24 00:00' },
    { id: 5, code: '125', status: 1, group: '2000果汁', time: '5/31 00:00' },
    { id: 6, code: '126', status: 3, group: '2000果肉', time: '8/18 00:00' },
    { id: 7, code: '134', status: 0, group: '2000主剂', time: '5/24 00:00' },
    { id: 8, code: '135', status: 1, group: '2000果汁', time: '5/31 00:00' },
    { id: 9, code: '136', status: 3, group: '2000果肉', time: '8/18 00:00' },
    { id: 10, code: '144', status: 0, group: '2000主剂', time: '5/24 00:00' },
    { id: 11, code: '145', status: 1, group: '2000果汁', time: '5/31 00:00' },
    { id: 12, code: '146', status: 3, group: '2000果肉', time: '8/18 00:00' }
]

export const TableDemo: FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(['2'])
    const history = useHistory()

    return (
        <Page
            header={{
                center: <Text>Page</Text>,
                left: <Text>Left</Text>,
                right: <Text numberOfLines={1}>RightRightRightRight</Text>
            }}
            F1={{
                label: <Text>F1 返回</Text>,
                handler: () => {
                    history.goBack();
                }
            }}
        >
            <Table
                // dataSource={dataSource}
                highlightable
                columns={[
                    { title: '需求单号', dataIndex: 'code' },
                    { title: '状态', dataIndex: 'status', render: t => STATUS[t] },
                    { title: '物料组', dataIndex: 'group' },
                    { title: '发料时间', dataIndex: 'time' }
                ]}
                expandable={{
                    rowExpandable: (record) => record.id === 3,
                    expandedRowRender: (record) => record.expandData
                }}
                rowSelection={{
                    selectedRowKeys,
                    // type: 'radio',
                    onChange: (selected) => {
                        setSelectedRowKeys(selected)
                    }
                }}
                onRowEnter={(rowKey) => console.info('enter row: ' + rowKey)}
                tableBodyHeight={440}
            />
        </Page>
    )
}
