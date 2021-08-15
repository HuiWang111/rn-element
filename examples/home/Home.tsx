import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { Link } from 'react-router-native';
import { ListItem } from 'react-native-elements';
import { routeConfig } from './routeConfig';
import { isEmulator } from 'react-native-device-info';
import { Toast } from '../../src';

const Home: FC = (): JSX.Element => {
    useEffect(() => {
        isEmulator().then((isEmulator) => {
            if (isEmulator) {
                Toast.show('运行在模拟器上');
            } else {
                Toast.show('运行在真实设备上');
            }
        });
    }, [])

    return (
        <View>
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
        </View>
    );
}

export default Home;