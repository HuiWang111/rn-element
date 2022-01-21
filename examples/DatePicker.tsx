import React, { FC, useState } from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import dayjs from 'dayjs'
import { List, Page, DatePicker } from '../src'
import { useHistory } from 'react-router-native'

const DatePickerDemo: FC = () => {
    const [index, setIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState(dayjs('2021-08-01'))
    const history = useHistory()
    const handleChange = (index: number) => {
        setIndex(index)
    }
    
    return (
        <>
            <Page
                header={{
                    center: 'date-picker'
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
                                    <DatePicker
                                        value={value}
                                        onChange={(val) => setValue(val)}
                                        onVisibleChange={visible => setVisible(visible)}
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

export default DatePickerDemo

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
