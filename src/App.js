import React, { Component } from "react"
import { Route, Switch } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Button from "@material-ui/core/Button"

import Map from "./components/Map"

const fooComp = str => () => <div>{str}</div>

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={fooComp("Main Page")} />
            <Route exact path="/map" component={Map} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
