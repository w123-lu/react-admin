import React, { Component } from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'

import Login from "./containers/login/login"
import Admin from "./containers/admin"
import history from './history'
import routes from './config/routes'
/*
应用根组件
 */
export default class App extends Component  {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Admin>
            <Switch>
              {
                routes.map(route => <Route {...route} key={route.path}/>)
              }
              <Redirect to="/home"/>
            </Switch>
          </Admin>
        </Switch>
      </Router>
    )
  }
}