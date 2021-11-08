import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button, Page } from '../src';

export const ButtonDemo: FC = () => {
    const history = useHistory()
    const handlePress = () => console.info('press')

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
                            <Button title='default' onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default' loading onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger loading onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' loading onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger loading onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default' disabled onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='default-danger' danger disabled onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary' type='primary' disabled onPress={handlePress} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title='primary-danger' type='primary' danger disabled onPress={handlePress} />
                        </View>
                    </ScrollView>
                )
            }
        </Page>
    )
}
