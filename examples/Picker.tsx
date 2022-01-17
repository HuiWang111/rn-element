import React, { FC, useState } from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { List, Page, Picker } from '../src'
import { useHistory } from 'react-router-native'

const numbers = new Array(30).fill(undefined).map((_, index) => String(index + 1))

const PickerDemo: FC = () => {
    const [index, setIndex] = useState(0)
    const [visible, setVisble] = useState(false)
    const [value, setValue] = useState('8')
    const history = useHistory()
    const handleChange = (index: number) => {
        setIndex(index)
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
                                <List.ActivableItem>
                                    <Picker
                                        value={value}
                                        onChange={(val) => setValue(val)}
                                        panelProps={{
                                            title: '标题标题',
                                            itemStyle: styles.item,
                                            activeItemStyle: styles.activeItem,
                                            showSearch: true,
                                            confirmOnSelect: true,
                                            searchInputProps: {
                                                placeholder: '请输入关键字搜索'
                                            }
                                        }}
                                        options={
                                            numbers.map(n => {
                                                return {
                                                    label: `选项${n}`,
                                                    value: n
                                                }
                                            })
                                        }
                                        onVisibleChange={(visible) => {
                                            setVisble(visible)
                                        }}
                                        placeholder='请选择'
                                    />
                                </List.ActivableItem>
                                <List.ActivableItem>
                                    <Text>1</Text>
                                </List.ActivableItem>
                            </List>
                        </View>
                    )
                }
            </Page>
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
