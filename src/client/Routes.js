import { withCookies } from 'react-cookie'
import { Switch, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import axios from 'axios'

import Login from './components/Login'
import Forum from './components/Forum'

const Routes = ({ cookies }) => {
  console.log(JSON.stringify(cookies.get('user')))
  const signOut = () => {
    cookies.remove('user')
  }
  const post = async data => {
    await axios({
      method: 'post',
      url: '/api/dynamo/save-post',
      data: data
    })
  }
  useEffect(() => {
    window.history.replaceState('', document.title, window.location.pathname)
  })
  return (
    <Switch>
      <Route exact path='/'>
        {!cookies.get('user') ? (
          <Login />
        ) : (
          <Forum
            user={cookies.get('user')}
            signOut={signOut}
            src={cookies.get('user').photos[0].value}
            post={post}
          />
        )}
      </Route>
    </Switch>
  )
}

export default withCookies(Routes)
