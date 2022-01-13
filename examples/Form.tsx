import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useHistory } from 'react-router-native'
import { Form, Toast, Page, Input, Switch, Checkbox, Radio } from '../src'

export const FormDemo: FC = () => {
    const history = useHistory()
    const [form] = Form.useForm()

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
            F2={{
                label: <Text>F1 提交</Text>,
                handler: () => {
                    Toast.show(JSON.stringify(form.getFieldsValue()))
                }
            }}
        >
            {
                ({ height }) => (
                    <>
                        <Form
                            form={form}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            wrapperStyle={{ marginLeft: 10 }}
                            style={{ height, backgroundColor: '#fff' }}
                            initialValues={{
                                5: '1',
                            }}
                        >
                            <Form.Item name='1' label='姓名'>
                                <Input placeholder='张三' />
                            </Form.Item>
                            <Form.Item
                                name='2'
                                label='年龄'
                                shouldUpdate={(prevValues, curValues) => {
                                    const res = curValues['3'] !== prevValues['3'] && curValues['3']
                                    return res
                                }}
                            >
                                {({ getFieldValue }) => {
                                    return (
                                        <View>
                                            {
                                                getFieldValue('3')
                                                    ? <Input placeholder='18' />
                                                    : null
                                            }
                                        </View>
                                    )
                                }}
                            </Form.Item>
                            <Form.Item name='3' label='是否展示年龄' valuePropName='checked' changeMethodName='onChange'>
                                <Switch />
                            </Form.Item>
                            <Form.Item name='5' label='性别' changeMethodName='onChange'>
                                <Radio.Group>
                                    <Radio value='1'>男</Radio>
                                    <Radio value='2'>女</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='6' label='水果' changeMethodName='onChange'>
                                <Checkbox.Group>
                                    <Checkbox value='1'>苹果</Checkbox>
                                    <Checkbox value='2'>香蕉</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </Form>
                    </>
                )
            }
        </Page>
    )
}
