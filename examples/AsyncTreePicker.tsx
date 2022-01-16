import React, { FC, useState, ReactText } from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { AsyncTreePicker, List, Toast, Page, Loading } from '../src'
import { IOptionWithChildren } from '../src/components/tree-picker/interface'
import { getListByDepth } from '../src/components/tree-picker/utils'
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
const wait = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined)
        }, ms)
    })
}

export const AsyncTreePickerDemo: FC = () => {
    const [index, setIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const [list, setList] = useState(options.map(o => ({ value: o.value, label: o.label })))
    const history = useHistory()
    const handleChange = (index: number) => {
        setIndex(index)
    }
    const handleConfirm = (value: ReactText[], labels: string[]) => {
        Toast.show(`value is ${value}, label is ${labels}`)
    }

    return (
        <>
            <Page
                header={{
                    center: <Text>picker</Text>
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
                                    <AsyncTreePicker
                                        title={['标题1', '标题2', '标题3']}
                                        panelProps={{
                                            itemStyle: styles.item,
                                            activeItemStyle: styles.activeItem,
                                            showSearch: true,
                                            searchInputProps: {
                                                placeholder: '请输入关键字搜索'
                                            }
                                        }}
                                        onChange={handleConfirm}
                                        options={list}
                                        depth={3}
                                        onNext={async (value, activeDepth, values) => {
                                            Loading.show()
                                            await wait(2000)
                                            setList(getListByDepth(activeDepth, options, values))
                                            Loading.hide()
                                        }}
                                        placeholder='请选择'
                                        onVisibleChange={v => setVisible(v)}
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
