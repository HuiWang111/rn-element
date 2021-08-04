import React, { FC, useState } from 'react';
import { Text, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
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
                leftComponent={<Button title='返回' onPress={() => history.goBack()} />}
            />
            <List
                activeIndex={activeIndex}
                onChange={handleChange}
                style={styles.list}
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
                    <TextInput placeholder='5 - isActivable' />
                </List.ActivableItem>
                <List.Item>
                    <Text>6</Text>
                </List.Item>
                <List.ActivableItem>
                    <Text>7 - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>8</Text>
                </List.Item>
                <List.ActivableItem>
                    <Text>9 - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>10</Text>
                </List.Item>
                <List.ActivableItem>
                    <Text>11 - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>12</Text>
                </List.Item>
                <List.ActivableItem>
                    <Text>13 - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>14</Text>
                </List.Item>
                <List.ActivableItem>
                    <Text>15 - isActivable</Text>
                </List.ActivableItem>
            </List>
        </>
    );
}

export default ListWithForm;

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
