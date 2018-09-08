import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import MapContainer from './components/Map/components/MapContainer'
import ResourcePortalPage from './components/ResourcePortal'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={MapContainer} />
            <Route
              exact
              path="/resources"
              component={ResourcePortalPage}
            />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App
