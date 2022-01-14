import React, { FC, ReactText, useState } from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { PickerPanel, List, Toast, Page } from '../src'
import { useHistory } from 'react-router-native'

const numbers = new Array(30).fill(undefined).map((_, index) => index + 1)

const PickerDemo: FC = () => {
    const [list, setList] = useState(numbers)
    const [index, setIndex] = useState(0)
    const [visible, setVisble] = useState(false)
    const [value, setValue] = useState<ReactText>(1)
    const history = useHistory()
    const handleChange = (index: number) => {
        setIndex(index)
    }
    const showPicker = () => setVisble(true)
    const handleConfirm = (v: ReactText) => {
        setValue(v)
        Toast.show(`value is ${v}`)
        setVisble(false)
    }
    const handleCancel = () => {
        setVisble(false)
    }

    const handelSearch = (keyword: string) => {
        if (keyword) {
            setList(numbers.filter(n => String(n).includes(keyword)))
        } else {
            setList(numbers)
        }
    }
    
    return (
        <>
            <Page
                header={{
                    center: 'picker'
                }}
                F1={{
                    label: <Text>F1 返回</Text>,
                    handler: () => {
                        history.goBack()
                    }
                }}
            >
                {
                    ({ height }) => (
                        <View style={{ height }}>
                            <List
                                activeIndex={index}
                                onChange={handleChange}
                                style={[styles.list]}
                                itemStyle={styles.item}
                                activeItemStyle={styles.activeItem}
                                keyboard={!visible}
                            >
                                <List.ActivableItem onEnter={showPicker} onPress={showPicker}>
                                    <Text>show picker</Text>
                                </List.ActivableItem>
                                <List.ActivableItem>
                                    <Text>1</Text>
                                </List.ActivableItem>
                            </List>
                        </View>
                    )
                }
            </Page>
            <PickerPanel
                title='标题标题'
                itemStyle={styles.item}
                activeItemStyle={styles.activeItem}
                value={value}
                visible={visible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                showSearch
                // fullScreen={false}
                confirmOnSelect
                searchInputProps={{
                    placeholder: '请输入关键字搜索'
                }}
                onSearch={handelSearch}
            >
                {
                    list.map(n => {
                        return (
                            <PickerPanel.Item
                                value={n}
                                key={n}
                            >
                                <Text>选项{n}</Text>
                            </PickerPanel.Item>
                        )
                    })
                }
            </PickerPanel>
        </>
    )
}

export default PickerDemo

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get('window').height - 70,
        backgroundColor: '#fff'
    },
    item: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff',
        position: 'relative'
    },
    activeItem: {
        backgroundColor: 'yellow'
    }
})
