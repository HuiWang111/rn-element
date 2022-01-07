import React, { FC, useState, useEffect } from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-native'
import Home from './Home'
import { history } from './history'
import { routeConfig } from './routeConfig'
import { ConfigProvider } from '../../src'
import { isEmulator } from 'react-native-device-info'

const HomeRouter: FC = () => {
    const [isEmul, setIsEmul] = useState(true)

    useEffect(() => {
        isEmulator().then((isEmulator) => {
            setIsEmul(isEmulator)
        })
    }, [])

    return (
        <ConfigProvider showSoftInputOnFocus={isEmul}>
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
        </ConfigProvider>
    )
}

export default HomeRouter
