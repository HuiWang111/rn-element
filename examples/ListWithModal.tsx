import React, { FC, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useHistory } from 'react-router-native'
import { List, Modal, Page, Form, Input, Loading } from '../src'
import { colors } from '../src/utils'

const wait = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined)
        }, ms)
    })
}

const ListWithModal: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [confirmModalVisible, setConfirmModalVisible] = useState(false)
    const history = useHistory()
    const [form] = Form.useForm()
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex)
    }

    const showModal = () => {
        setModalVisible(true)
    }

    const showConfirmModal = () => {
        Modal.confirm({
            title: <Text>alert</Text>,
            content: <Text>are you kidding me?are you kidding me?are you kidding me?are you kidding me?are you kidding me?</Text>,
            onOk: () => {
                console.info('ok')
            },
            onCancel: () => {
                console.info('cancel')
            },
            onVisibleChange: (visible) => {
                setConfirmModalVisible(visible)
            }
        })
    }

    const showInfoModal = () => {
        Modal.info({
            title: <Text>通知</Text>,
            content: <Text>你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？</Text>,
            onOk: () => {
                console.info('ok')
            }
        })
    }

    const showErrorModal = () => {
        Modal.error({
            title: <Text>出错了</Text>,
            content: <Text>你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？</Text>,
            onOk: () => {
                console.info('ok')
            }
        })
    }

    const showSuccessModal = () => {
        Modal.success({
            title: <Text>成功了</Text>,
            content: <Text>你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？</Text>,
            onOk: () => {
                console.info('ok')
            }
        })
    }

    const showWarningModal = () => {
        Modal.warning({
            title: <Text>警告警告</Text>,
            content: <Text>你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？你知道吗？</Text>,
            onOk: () => {
                console.info('ok')
            }
        })
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
                    history.goBack()
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
                            style={{
                                width,
                                height: height - 30
                            }}
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
                            <List.ActivableItem style={styles.lastItem} onPress={showInfoModal} onEnter={showInfoModal}>
                                <Text>showInfoModal - isActivable</Text>
                            </List.ActivableItem>
                            <List.ActivableItem style={styles.lastItem} onPress={showErrorModal} onEnter={showErrorModal}>
                                <Text>showErrorModal - isActivable</Text>
                            </List.ActivableItem>
                            <List.ActivableItem style={styles.lastItem} onPress={showSuccessModal} onEnter={showSuccessModal}>
                                <Text>showSuccessModal - isActivable</Text>
                            </List.ActivableItem>
                            <List.ActivableItem style={styles.lastItem} onPress={showWarningModal} onEnter={showWarningModal}>
                                <Text>showWarningModal - isActivable</Text>
                            </List.ActivableItem>
                        </List>
                        {/* 测试form内存泄漏问题 */}
                        <Form form={form} wrapperCol={{ span: 22, offset: 1 }}>
                            <Form.Item name='age'>
                                <Input placeholder='fill your age' />
                            </Form.Item>
                        </Form>
                        {
                            modalVisible && (
                                <Modal
                                    title={<Text>modal title</Text>}
                                    onCancel={() => setModalVisible(false)}
                                    onOk={async () => {
                                        console.info('onOk')
                                        Loading.show()
                                        await wait(2000)
                                        Loading.hide()
                                    }}
                                    onRequestClose={() => setModalVisible(false)}
                                    visible={modalVisible}
                                    okText='confirm'
                                    cancelText='cancel'
                                >
                                    <Form form={form} wrapperCol={{ span: 20, offset: 2 }}>
                                        <Form.Item name='name'>
                                            <Input placeholder='fill your name' />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            )
                        }
                    </View>
                )
            }
        </Page>
    )
}

export default ListWithModal

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
})
