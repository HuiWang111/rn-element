import React, { FC } from 'react';
import { Text, TextInput } from 'react-native';
import { useHistory } from 'react-router-native';
import { Form, Toast, Page } from '../src';

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
            <Form form={form}>
                <Form.Item name='1'>
                    <TextInput placeholder='1' />
                </Form.Item>
                <Form.Item name='2'>
                    <TextInput placeholder='2' />
                </Form.Item>
            </Form>
        </Page>
    )
}
