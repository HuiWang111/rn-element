import React, { FC, useState, ReactText } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { TreePicker, List, Toast, Page } from '../src';
import { IOption } from '../src/components/treePicker/interface';
import { useHistory } from 'react-router-native';
import { colors } from '../src/utils';

const numbers = new Array(30).fill(undefined).map((_, index) => index + 1);
const options: IOption[] = numbers.map(n => {
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
                    };
                })
            };
        })
    };
});

const TreePickerDemo: FC = () => {
    const [index, setIndex] = useState(0);
    const [visible, setVisble] = useState(false);
    const history = useHistory();
    const handleChange = (index: number) => {
        setIndex(index);
    }
    const showPicker = () => setVisble(true);
    const handleConfirm = (value: ReactText[]) => {
        Toast.show(`value is ${value}`);
        setVisble(false);
    }
    const handleCancel = () => {
        setVisble(false);
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
                            style={styles.list}
                            itemStyle={styles.item}
                            activeItemStyle={styles.activeItem}
                            keyboard={!visible}
                        >
                            <List.ActivableItem onEnter={showPicker} onPress={showPicker}>
                                <Text>show tree-picker</Text>
                            </List.ActivableItem>
                            <List.ActivableItem>
                                <Text>1</Text>
                            </List.ActivableItem>
                        </List>
                        <TreePicker
                            itemStyle={styles.item}
                            activeItemStyle={styles.activeItem}
                            unfocusActiveItemStyle={styles.unfocusActiveItem}
                            visible={visible}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                            options={options}
                        />
                    </View>
                )
            }
        </Page>
    );
}

export default TreePickerDemo;

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
    unfocusActiveItem: {
        backgroundColor: colors.border
    },
    lastItem: {
        borderBottomWidth: 0
    }
});