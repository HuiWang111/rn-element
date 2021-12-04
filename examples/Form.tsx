import React, { FC } from 'react';
import { Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { Form, Toast, Page, Input } from '../src';

export const FormDemo: FC = () => {
    const history = useHistory();
    const [form] = Form.useForm();

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
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} wrapperStyle={{ marginLeft: 10 }}>
                <Form.Item name='1' label='姓名'>
                    <Input placeholder='张三' />
                </Form.Item>
                <Form.Item name='2' label='年龄'>
                    <Input placeholder='李四' />
                </Form.Item>
            </Form>
        </Page>
    )
}
