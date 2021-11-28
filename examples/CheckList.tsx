import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { CheckList, Page } from '../src';

export const CheckListDemo: FC = () => {
    const [checked, setChecked] = useState<string[]>([]);
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
                        <CheckList
                            value={checked}
                            options={[
                                {
                                    label: '一一一一一一一一一一一一一一一一一一一一一一一一一一一一',
                                    value: '1'
                                },
                                {
                                    label: '二二二二二二二二二二二二二二二二二二二二二二二二二二二二',
                                    value: '2'
                                },
                                {
                                    label: '三三三三三三三三三三三三三三三三三三三三三三三三三三三三',
                                    value: '3',
                                    disabled: true
                                },
                                {
                                    label: '四四四四四四四四四四四四四四四四四四四四四四四四四四四四',
                                    value: '4'
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
