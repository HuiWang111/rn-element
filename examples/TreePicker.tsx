import React, { FC, useState } from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { TreePicker, List, Toast, Page } from '../src'
import { IOptionWithChildren } from '../src/components/tree-picker/interface'
import { useHistory } from 'react-router-native'
import { colors } from '../src/utils'

const numbers = new Array(30).fill(undefined).map((_, index) => index + 1)
const options: IOptionWithChildren[] = numbers.map(n => {
    return {
        value: String(n),
        label: `选项${n}`,
        children: numbers.map(i => {
            return {
                value: `${n}-${i}`,
                label: `选项${n}-${i}`,
                children: numbers.map(v => {
                    return {
                        value: `${n}-${i}-${v}`,
                        label: `选项${n}-${i}-${v}`
                    }
                })
            }
        })
    }
})

const TreePickerDemo: FC = () => {
    const [index, setIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState(['1', '1-5', '1-5-3'])
    const history = useHistory()
    const handleChange = (index: number) => {
        setIndex(index)
    }
    const handleConfirm = (value: string[]) => {
        Toast.show(`value is ${value}`)
        setValue(value)
    }

    return (
        <>
            <Page
                header={{
                    center: <Text>tree-picker</Text>
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
                                style={styles.list}
                                itemStyle={styles.item}
                                activeItemStyle={styles.activeItem}
                                keyboard={!visible}
                            >
                                <List.ActivableItem>
                                    <TreePicker
                                        title={['标题1', '标题2', '标题3']}
                                        panelProps={{
                                            itemStyle: styles.item,
                                            activeItemStyle: styles.activeItem,
                                            showSearch: true,
                                            searchInputProps: {
                                                placeholder: '请输入关键字搜索'
                                            }
                                        }}
                                        value={value}
                                        onChange={handleConfirm}
                                        options={options}
                                        onVisibleChange={v => setVisible(v)}
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

export default TreePickerDemo

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
    },
    unfocusActiveItem: {
        backgroundColor: colors.border
    },
    lastItem: {
        borderBottomWidth: 0
    }
})
