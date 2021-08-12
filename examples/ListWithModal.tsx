import React, { FC, useState } from 'react';
import { Text, StyleSheet, TextInput, View, Button } from 'react-native';
import { Header } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import { List, Modal } from '../src';
import { colors } from '../src/utils';

const ListWithModal: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const history = useHistory();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    return (
        <>
            <Header
                leftComponent={
                    <Button title='返回' onPress={() => history.goBack()} />
                }
            />
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
                <List.ActivableItem style={styles.lastItem} autoFocus inputComponent={TextInput}>
                    <TextInput placeholder='isActivable' />
                </List.ActivableItem>
            </List>
            <View>
                <Button
                    title='show config modal'
                    onPress={() => {
                        Modal.confirm({
                            title: <Text>alert</Text>,
                            content: <Text>are you kidding me?</Text>,
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
                title={<Text>modal title</Text>}
                onCancel={() => setModalVisible(false)}
                onOk={() => console.info('onOk')}
                onRequestClose={() => setModalVisible(false)}
                visible={modalVisible}
                okText='confirm'
                cancelText='cancel'
            >
                <Text>content</Text>
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
