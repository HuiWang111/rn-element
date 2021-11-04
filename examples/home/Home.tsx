import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Link } from 'react-router-native';
import { routeConfig } from './routeConfig';
const Home: FC = (): JSX.Element => {
    return (
        <View>
            {
                routeConfig.map((route, index) => {
                    return (
                        <View
                            key={route.path}
                            style={{
                                height: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: 20,
                                borderTopColor: '#eee',
                                borderTopWidth: index > 0 ? 1 : 0
                            }}
                        >
                            <Link to={`/${route.path}`}>
                                <Text>{route.path}</Text>
                            </Link>
                        </View>
                    );
                })
            }
        </View>
    );
}

export default Home;