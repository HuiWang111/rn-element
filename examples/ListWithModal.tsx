import React, { FC, useState } from 'react';
import { Text, StyleSheet, TextInput, View, Button } from 'react-native';
import { List, Modal } from '../src';
import { colors } from '../src/utils';

const ListWithModal: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <>
            <List
                activeIndex={activeIndex}
                onChange={handleChange}
                itemStyle={styles.item}
                activeItemStyle={styles.activeItem}
                onEnter={() => {
                    if (activeIndex === 2) {
                        setModalVisible(true);
                    }
                }}
                keyboard={!modalVisible}
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
            <View>
                <Button
                    title='show config modal'
                    onPress={() => {
                        Modal.confirm({
                            title: 'alert',
                            content: 'are you kidding me?',
                            onOk: () => {
                                console.info('ok');
                            },
                            onCancel: () => {
                                console.info('cancel');
                            }
                        })
                    }}
                >

                </Button>
            </View>
            <Modal
                title='modal title'
                onCancel={() => setModalVisible(false)}
                onOk={() => console.info('onOk')}
                onRequestClose={() => setModalVisible(false)}
                visible={modalVisible}
                okText='confirm'
                cancelText='cancel'
            >
                content
            </Modal>
        </>
    );
}

export default ListWithModal;

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
