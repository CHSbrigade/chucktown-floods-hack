import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const fooComp = str => () => <div>{str}</div>

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={fooComp('Main Page')} />
            <Route exact path="/map" component={fooComp('Map Page')} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
