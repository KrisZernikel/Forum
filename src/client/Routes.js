import { withCookies } from 'react-cookie'
import { Switch, Route } from 'react-router-dom'
import React, { useEffect } from 'react'

import Login from './components/Login'
import Forum from './components/Forum'

const Routes = ({ cookies }) => {
    console.log(JSON.stringify(cookies.get("user")));
    const signOut = () => {
        cookies.remove('user')
    }
    useEffect(() => {
        window.history.replaceState('', document.title, window.location.pathname);
        console.log(cookies)
    })
    return (
        <Switch>
            <Route exact path="/">
                { !cookies.get('user') ? <Login /> : <Forum user={cookies.get("user")} signOut={signOut} src={cookies.get("user").photos[0].value} />}
            </Route>
        </Switch>
    )
}

export default withCookies(Routes)