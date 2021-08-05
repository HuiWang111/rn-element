import React, { FC, useState } from 'react';
import { Pressable, Text, Dimensions, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import { List, Picker } from '../src';
import { colors } from '../src/utils';

const ListWithCascader: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const history = useHistory();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <>
            <Header
                leftComponent={
                    <Pressable onPress={() => history.goBack()}>
                        <Text style={{ color: '#fff' }}>返回</Text>
                    </Pressable>
                }
            />
            <List
                activeIndex={activeIndex}
                onChange={handleChange}
                style={styles.list}
                itemStyle={styles.item}
                activeItemStyle={styles.activeItem}
            >
                <List.ActivableItem>
                    <Picker
                        options={[
                            { value: 1, label: '选项1' },
                            { value: 2, label: '选项2' },
                            { value: 3, label: '选项3' },
                            { value: 4, label: '选项4' }
                        ]}
                    >
                        <Pressable>
                            <Text>show cascader</Text>
                        </Pressable>
                    </Picker>
                </List.ActivableItem>
                <List.ActivableItem>
                    <Text>1 - activable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>2</Text>
                </List.Item>
                <List.Item>
                    <Text>3</Text>
                </List.Item>
            </List>
        </>
    );
}

export default ListWithCascader;

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get('window').height
    },
    item: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderBottomColor: colors.border,
        borderBottomWidth: 1
    },
    activeItem: {
        backgroundColor: 'yellow'
    },
    lastItem: {
        borderBottomWidth: 0
    }
});
