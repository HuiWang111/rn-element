import React, { FC, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { List, Modal, Page } from '../src';
import { colors } from '../src/utils';

const ListWithModal: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const history = useHistory();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
    }

    const showModal = () => {
        setModalVisible(true);
    }

    const showConfirmModal = () => {
        Modal.confirm({
            title: <Text>alert</Text>,
            content: <Text>are you kidding me?</Text>,
            onOk: () => {
                console.info('ok');
            },
            onCancel: () => {
                console.info('cancel');
            },
            onVisibleChange: (visible) => {
                setConfirmModalVisible(visible);
            }
        });
    }

    return (
        <Page
            header={{
                center: <Text>Page</Text>,
                left: <Text>Left</Text>,
                right: <Text numberOfLines={1}>RightRightRightRight</Text>
            }}
            F1={{
                label: <Text>F1 返回</Text>,
                handler: () => {
                    history.goBack();
                }
            }}
        >
            <List
                activeIndex={activeIndex}
                onChange={handleChange}
                itemStyle={styles.item}
                activeItemStyle={styles.activeItem}
                keyboard={!modalVisible || !confirmModalVisible}
            >
                <List.ActivableItem>
                    <Text>1 - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>2</Text>
                </List.Item>
                <List.ActivableItem onPress={showModal} onEnter={showModal}>
                    <Text>showModal - isActivable</Text>
                </List.ActivableItem>
                <List.Item>
                    <Text>4</Text>
                </List.Item>
                <List.ActivableItem style={styles.lastItem} onPress={showConfirmModal} onEnter={showConfirmModal}>
                    <Text>showConfirmModal - isActivable</Text>
                </List.ActivableItem>
            </List>
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
        </Page>
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
