import React, { FC, ReactText, useState } from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Picker, List, Toast } from '../src';
import { colors } from '../src/utils';

const PickerDemo: FC = () => {
    const list = new Array(10).fill(undefined).map((_, index) => index + 1);
    const [index, setIndex] = useState(0);
    const [visible, setVisble] = useState(false);
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
    
    return (
        <>
            <List
                activeIndex={index}
                onChange={handleChange}
                style={styles.list}
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
        </>
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
