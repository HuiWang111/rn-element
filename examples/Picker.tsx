import React, { FC, useState, useRef } from 'react';
import { Text, StyleSheet, Dimensions, View } from 'react-native';
import { List, Page } from '../src';
import { useHistory } from 'react-router-native';
import { colors } from '../src/utils';
import { Picker } from '@react-native-picker/picker';

const PickerDemo: FC = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selected, setSelected] = useState('1');
    const history = useHistory();
    const pickerRef = useRef<Picker<string>>();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }
    const options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' },
        { value: '4', label: '选项4' }
    ]

    return (
        <Page
            header={{
                center: <Text>Picker</Text>
            }}
            F1={{
                label: <Text>F1 返回</Text>,
                handler: () => {
                    history.goBack();
                }
            }}
        >
            {
                ({ width, height }) => (
                    <View
                        style={{
                            width,
                            height: height - 30
                        }}
                    >
                        <List
                            activeIndex={activeIndex}
                            onChange={handleChange}
                            style={[styles.list, { width, height: height - 30 }]}
                            itemStyle={styles.item}
                            activeItemStyle={styles.activeItem}
                        >
                            <List.ActivableItem
                                onEnter={() => pickerRef.current?.focus()}
                                style={styles.pickerItem}
                            >
                                <Picker
                                    ref={pickerRef}
                                    selectedValue={selected}
                                    onValueChange={value => setSelected(value)}
                                    style={{ width }}
                                >
                                    {
                                        options.map(option => {
                                            const { value, label } = option;

                                            return (
                                                <Picker.Item
                                                    value={value}
                                                    key={value}
                                                    label={label}
                                                />
                                            );
                                        })
                                    }
                                </Picker>
                            </List.ActivableItem>
                            <List.ActivableItem>
                                <Text>1</Text>
                            </List.ActivableItem>
                        </List>
                    </View>
                )
            }
        </Page>
    );
}

export default PickerDemo;

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get('window').height - 70
    },
    item: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
    },
    pickerItem: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    activeItem: {
        backgroundColor: 'yellow'
    },
    lastItem: {
        borderBottomWidth: 0
    }
});