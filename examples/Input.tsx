import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Input, Page } from '../src';

export const InputDemo: FC = () => {
    const history = useHistory()
    const [value, setValue] = useState('')
    const handleChange = (value: string) => {
        setValue(value)
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
                        <View>
                            <Input clearable value={value} onChangeText={handleChange} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Input editable={false} clearable={false} value='bbbbbbbbb' />
                        </View>
                    </View>
                )
            }
        </Page>
    )
}
