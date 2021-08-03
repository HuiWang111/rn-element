import React, { FC } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-native';
import Home from './Home';
import { history } from './history';
import { routeConfig } from './routeConfig';

const HomeRouter: FC = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/home' component={Home} />
                {
                    routeConfig.map(route => {
                        return <Route exact key={route.path} { ...route } path={`/${route.path}`} />
                    })
                }
                <Redirect from='/' to='/home' />
            </Switch>
        </Router>
    );
}

export default HomeRouter;
