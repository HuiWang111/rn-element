import React, { FC, ReactText, useState } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Picker, List, Toast, Page } from '../src';
import { useHistory } from 'react-router-native';
import { colors } from '../src/utils';

const numbers = new Array(30).fill(undefined).map((_, index) => index + 1);

const PickerDemo: FC = () => {
    const [list, setList] = useState(numbers);
    const [index, setIndex] = useState(0);
    const [visible, setVisble] = useState(false);
    const history = useHistory();
    const handleChange = (index: number) => {
        setIndex(index);
    }
    const showPicker = () => setVisble(true);
    const handleConfirm = (value: ReactText) => {
        Toast.show(`value is ${value}`);
        setVisble(false);
    }
    const handleCancel = () => {
        setVisble(false);
    }

    const handelSearch = (keyword: string) => {
        if (keyword) {
            setList(numbers.filter(n => String(n).includes(keyword)));
        } else {
            setList(numbers);
        }
    }
    
    return (
        <Page
            header={{
                center: <Text>picker</Text>
            }}
            F1={{
                label: <Text>F1 返回</Text>,
                handler: () => {
                    history.goBack();
                }
            }}
        >
            {
                ({ height }) => (
                    <View style={{ height: height - 30 }}>
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
                        <Picker
                            itemStyle={styles.item}
                            activeItemStyle={styles.activeItem}
                            value={1}
                            visible={visible}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                            showSearch
                            searchInputProps={{
                                placeholder: '请输入关键字搜索'
                            }}
                            onSearch={handelSearch}
                        >
                            {
                                list.map(n => {
                                    return (
                                        <Picker.Item
                                            value={n}
                                            key={n}
                                        >
                                            <Text>选项{n}</Text>
                                        </Picker.Item>
                                    );
                                })
                            }
                        </Picker>
                    </View>
                )
            }
        </Page>
    );
}

export default PickerDemo;

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
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        position: 'relative'
    },
    activeItem: {
        backgroundColor: 'yellow'
    },
    lastItem: {
        borderBottomWidth: 0
    }
});
