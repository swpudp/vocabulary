import React, { Component } from 'react'
import './app.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRouters } from './routers/routeMap';
import Index from './pages/layout';

class App extends Component {
  render() {
    return (
      <Index>
        <Switch>
          {authRouters.map(r => {
            return <Route
              key={r.path}
              path={r.path}
              exact={r.exact}
              render={rProps => {
                return <r.component {...rProps}></r.component>
              }}></Route>
          })}
          <Redirect to='/404' />
        </Switch>
      </Index>
    )
  }
}

export default App
