import React, { FC, useState } from 'react';
import { Text, StyleSheet, TextInput, Button } from 'react-native';
import { Header } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import { List } from '../src';
import { colors } from '../src/utils';

const ListWithForm: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const history = useHistory();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <>
            <Header
                leftComponent={<Button title='返回' onPress={() => history.push('/home')} />}
            />
            <List
                activeIndex={activeIndex}
                onChange={handleChange}
                itemStyle={styles.item}
                activeItemStyle={styles.activeItem}
                // loop={false}
            >
                <List.ActivableItem>
                    <Text>1 - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>2</Text>
                </List.Item>
                <List.ActivableItem>
                    <Text>showModal - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>4</Text>
                </List.Item>
                <List.ActivableItem style={styles.lastItem} autoFocus InputComponent={TextInput}>
                    <TextInput placeholder='isActivable' />
                </List.ActivableItem>
            </List>
        </>
    );
}

export default ListWithForm;

const styles = StyleSheet.create({
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
