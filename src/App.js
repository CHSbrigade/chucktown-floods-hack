import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MapContainer from './components/Map/components/MapContainer'
import ResourcePortalPage from './components/ResourcePortal'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '50%',
    margin: '0 auto'
  },
  inputAppBar: {
    // ...theme.mixins.gutters(),
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: 'black'
  },
  // rootSearch: {
  //   flexGrow: 1
  // },
  rootGrid: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={MapContainer} />
            <Route
              exact
              path="/search"
              render={() => (
              <ResourcePortalPage
                  classes={this.props.classes}
                />
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default withStyles(styles)(App)
