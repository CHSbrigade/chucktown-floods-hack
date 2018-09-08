import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import Map from './components/Map'
import ResourcePortal from './components/ResourcePortal'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route
              exact
              path="/resources"
              component={ResourcePortal}
            />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App
