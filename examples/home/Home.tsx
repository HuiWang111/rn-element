import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Link } from 'react-router-native';
import { ListItem } from 'react-native-elements';
import { routeConfig } from './routeConfig';
import { isEmulator } from 'react-native-device-info';
import { ConfigProvider } from '../../src';

const Home: FC = (): JSX.Element => {
    const [isEmul, setIsEmul] = useState(true);

    useEffect(() => {
        isEmulator().then((isEmulator) => {
            setIsEmul(isEmulator);
        });
    }, []);

    return (
        <View>
            <ConfigProvider showSoftInputOnFocus={isEmul}>
                {
                    routeConfig.map(route => {
                        return (
                            <Link to={`/${route.path}`} key={route.path}>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>{route.path}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            </Link>
                        );
                    })
                }
            </ConfigProvider>
        </View>
    );
}

export default Home;