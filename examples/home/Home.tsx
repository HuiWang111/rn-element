import React, { FC } from 'react';
import { View } from 'react-native';
import { Link } from 'react-router-native';
import { ListItem } from 'react-native-elements';
import { routeConfig } from './routeConfig';

const Home: FC = (): JSX.Element => {
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