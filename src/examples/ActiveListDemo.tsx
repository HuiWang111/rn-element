import React, { FC, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { List } from '../components';

const ActiveListDemo: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <List
            activeIndex={activeIndex}
            onChange={handleChange}
            itemStyle={styles.item}
            activeItemStyle={styles.activeItem}
        >
            <List.ActivableItem>
                <Text>1 - isActivable</Text>
            </List.ActivableItem>
            <List.Item>
                <Text>2</Text>
            </List.Item>
            <List.ActivableItem>
                <Text>3 - isActivable</Text>
            </List.ActivableItem>
            <List.Item>
                <Text>4</Text>
            </List.Item>
            <List.ActivableItem>
                <Text>5 - isActivable</Text>
            </List.ActivableItem>
        </List>
    );
}

export default ActiveListDemo;

const styles = StyleSheet.create({
    item: {
        height: 40,
        alignContent: 'center',
        paddingLeft: 20 
    },
    activeItem: {
        backgroundColor: 'yellow'
    }
});
