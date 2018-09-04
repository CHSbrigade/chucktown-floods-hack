import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { HashRouter, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {
  map,
  nth,
  assoc,
  not,
  prop,
  pick,
  toPairs,
  filter,
  objOf,
  merge,
  head
} from 'ramda'
import { performSearch } from './utils'
import bg from './assets/bg.png'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MapContainer from './components/MapContainer'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Search from '@material-ui/icons/Search'
import Place from '@material-ui/icons/Place'

import ResourceDetail from './components/ResourceDetail'
import Tides from './components/FooTides'

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
const Home = props => {
  return (
    <div>
      {props.searchFetching ? (
        <Redirect to="/search" />
      ) : (
        <div
          className="vh-100 dt w-100 tc bg-dark-gray white cover"
          style={{ background: `url(${bg}) no-repeat center` }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2em',
              right: '2em',
              color: 'white',
              letterSpacing: '1px',
              textDecoration: 'none'
            }}
          >
            <Link to="/search" style={{ textDecoration: 'none' }}>
              <Button
                style={{
                  color: 'white',
                  letterSpacing: '1px',
                  textDecoration: 'none'
                }}
              >
                {/* <Help /> */}
                <span style={{ textDecoration: 'none' }}> RESOURCES</span>
              </Button>
            </Link>
            <Link to="/map" style={{ textDecoration: 'none' }}>
              <Button
                style={{
                  color: 'white',
                  letterSpacing: '1px',
                  textDecoration: 'none'
                }}
              >
                <Place /> MAP
              </Button>
            </Link>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '1em',
              left: '2em',
              color: 'white',
              height: 50,
              width: 50
            }}
          >
            <img src="https://file-tojimaepbm.now.sh/" alt='logo' />
          </div>
          <div className="dtc v-mid">
            <header className="white-70" />
            <div className="w-50 center">
              <Typography
                variant="headline"
                style={{
                  color: 'white',
                  textAlign: 'left'
                }}
              >
                Search for flooding related
              </Typography>
              <Typography
                variant="headline"
                style={{
                  color: 'white',
                  textAlign: 'left',
                  marginBottom: '1em'
                }}
              >
                material in the Greater Charleston area.
              </Typography>
            </div>
            <div>
              <Paper className={props.classes.root} elevation={6}>
                <form onSubmit={props.handleSearchRequest}>
                  <FormControl fullWidth className={props.classes.margin}>
                    <Input
                      id="adornment-amount"
                      value={props.searchText}
                      placeholder={`Try "Flood Map"`}
                      disableUnderline
                      onChange={props.handleSearchChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </form>
              </Paper>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  handleSearchRequest={this.handleSearchRequest}
                  classes={this.props.classes}
                  searchFetching={this.state.searchFetching}
                  searchText={this.state.searchText}
                  handleSearchChange={this.handleSearchChange}
                />
              )}
            />
            <Route
              exact
              path="/search"
              render={() => (
                <ResourcePortalPage
                  classes={this.props.classes}
                />
              )}
            />
            <Route
              exact
              path="/map"
              render={() => {
                return (
                  <MapContainer
                    handleAddressChange={this.handleAddressChange}
                    handleAddressSelect={this.handleAddressSelect}
                    address={this.state.address}
                    lat={this.state.lat}
                    lng={this.state.lng}
                  />
                )
              }}
            />
            <Route exact path="/tides" component={Tides} />
            <Route path="/resource/:id" component={ResourceDetail} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default withStyles(styles)(App)
