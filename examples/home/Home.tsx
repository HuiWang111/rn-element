import React, { FC } from 'react';
import { View, Button } from 'react-native';
import { Route, Switch, Router } from 'react-router-native';
import { history } from './history';
import { routeConfig } from './routeConfig';

const Home: FC = (): JSX.Element => {
    return (
        <>
            <View>
                
            </View>
            <Router history={history}>
                <Switch>
                    {
                        routeConfig.map(route => {
                            return <Route key={route.path} { ...route }  />
                        })
                    }
                </Switch>
            </Router>
        </>
    );
}

export default Home;