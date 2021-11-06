import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button, Page } from '../src';

export const ButtonDemo: FC = () => {
    const history = useHistory()

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
                    <ScrollView style={{ width, height: height - 60 }}>
                        <View>
                            <Button title='default' />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default' loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger loading />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default' disabled />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger disabled />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' disabled />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger disabled />
                        </View>
                    </ScrollView>
                )
            }
        </Page>
    )
}
