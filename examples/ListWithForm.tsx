import React, { FC, useState } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { useHistory } from 'react-router-native';
import { List, Form, Toast, Page, NumberInput, Input } from '../src';
import { colors } from '../src/utils';

const ListWithForm: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [form] = Form.useForm();
    const history = useHistory();
    const handleChange = (activeIndex: number) => {
        setActiveIndex(activeIndex);
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
            F2={{
                label: <Text>F1 提交</Text>,
                handler: () => {
                    Toast.show(JSON.stringify(form.getFieldsValue()));
                }
            }}
        >
            {
                ({ width, height }) => (
                    <Form
                        form={form}
                        style={{ width, height: height - 30 }}
                        initialValues={{
                            gender: 'male',
                            age: 11
                        }}
                    >
                        <List
                            activeIndex={activeIndex}
                            onChange={handleChange}
                            style={[styles.list, { width, height: height - 30 }]}
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
                            <List.ActivableItem style={styles.lastItem} autoFocus>
                                <Input placeholder='5 - isActivable' />
                            </List.ActivableItem>
                            <List.Item>
                                <Text>6</Text>
                            </List.Item>
                            <List.ActivableItem autoFocus inputComponent={NumberInput}>
                                <Form.Item name='age' rules={[{ required: true, message: '必填' }]}>
                                    <NumberInput placeholder='7 - isActivable age' />
                                </Form.Item>
                            </List.ActivableItem>
                            <List.Item>
                                <Text>8</Text>
                            </List.Item>
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
                            <List.Item>
                                <Text>16</Text>
                            </List.Item>
                            <List.ActivableItem>
                                <Text>17 - isActivable</Text>
                            </List.ActivableItem>
                            <List.Item>
                                <Text>18</Text>
                            </List.Item>
                            <List.ActivableItem>
                                <Text>19 - isActivable</Text>
                            </List.ActivableItem>
                            <List.Item>
                                <Text>20</Text>
                            </List.Item>
                            <List.ActivableItem>
                                <Text>21 - isActivable</Text>
                            </List.ActivableItem>
                            <List.Item>
                                <Text>22</Text>
                            </List.Item>
                            <List.ActivableItem>
                                <Text>23 - isActivable</Text>
                            </List.ActivableItem>
                        </List>
                    </Form>
                )
            }
        </Page>
    );
}

export default ListWithForm;

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get('window').height - 70
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
