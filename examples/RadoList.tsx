import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { RadioList, Page } from '../src';

export const RadoList: FC = () => {
    const [checked, setChecked] = useState('');
    const history = useHistory();

    const handleChange = (value) => {
        setChecked(value);
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
            {
                ({ width, height }) => (
                    <View style={{ width, height: height - 30 }}>
                        <RadioList
                            value={checked}
                            options={[
                                {
                                    label: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                                    value: 1
                                },
                                {
                                    label: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                                    value: 2
                                },
                                {
                                    label: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                                    value: 3,
                                    disabled: true
                                },
                                {
                                    label: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                                    value: 4
                                }
                            ]}
                            onChange={handleChange}
                        />
                    </View>
                )
            }
        </Page>
    );
}
