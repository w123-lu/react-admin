import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from "./containers/login/login"
import Admin from "./containers/admin"

/*
应用根组件
 */
export default class App extends Component  {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} exact/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}