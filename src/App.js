import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { HashRouter, Link } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import coastToolsData from './coastal-tools.json'
import baseUrls from './base-url.json'
import {
  map,
  nth,
  intersection,
  contains,
  isEmpty,
  length,
  assoc,
  not,
  reject,
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
import InputLabel from '@material-ui/core/InputLabel'
import MapContainer from './components/MapContainer'
import ResultCard from './components/ResourcePortal/components/ResultCard'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Drawer from '@material-ui/core/Drawer'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Search from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'
import FilterList from '@material-ui/icons/FilterList'
import Help from '@material-ui/icons/Help'
import Place from '@material-ui/icons/Place'
import Close from '@material-ui/icons/Close'

import Grid from '@material-ui/core/Grid'
import ResourceDetail from './components/ResourceDetail'
import FilterListComp from './components/ResourcePortal/components/FilterList'
import { withRouter } from 'react-router'
import algoliasearch from 'algoliasearch'
import ContainerDimensions from 'react-container-dimensions'
import Tides from './components/FooTides'

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

const SearchComp = props => {
  const {
    state: { categoriesToShow }
  } = props

  const show = props => {
    const matchesCategory =
      length(intersection(props.categories, categoriesToShow)) > 0

    const checks = [matchesCategory]
    return !contains(false, checks)
  }

  const resourcesToShow = filter(show, props.searchResults)

  const showCard = props => (
    <div className="mb2">
      <ResultCard {...props} />
    </div>
  )

  return (
    <div className={props.classes.rootSearch}>
      <AppBar
        position="static"
        style={{
          backgroundColor: 'rgb(245, 245, 245)',
          zIndex: '5',
          boxShadow: 'none'
          // borderBottom: '1px solid lightgray'
        }}
      >
        <Toolbar>
          <IconButton
            className={props.classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <Link to="/">
              <KeyboardBackspace style={{ color: 'black' }} />
            </Link>
          </IconButton>
          <div>
            <Paper
              className={props.classes.inputAppBar}
              style={{ position: 'relative', top: '2px', padding: '.5em' }}
              elevation={1}
            >
              <form onSubmit={props.handleSearchRequest}>
                <FormControl fullWidth className={props.classes.margin}>
                  <Input
                    id="adornment-amount"
                    value={props.searchText}
                    onChange={props.handleSearchChange}
                    disableUnderline={true}
                    placeholder={`try "Flood Map"`}
                    startAdornment={
                      <InputAdornment position="start">
                        <Search style={{ marginLeft: '7px' }} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </form>
            </Paper>
          </div>
          <Hidden smDown>
            <Link to="/map">
              <Button
                color="black"
                style={{ position: 'absolute', top: 14, right: 60 }}
              >
                <Place />
              </Button>
            </Link>
          </Hidden>
          <Button
            color="black"
            style={{ position: 'absolute', top: 14, right: 10 }}
            onClick={props.toggleDrawer}
          >
            <FilterList />
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        onClose={props.toggleDrawer}
        open={props.drawerOpen}
        classes={{
          paper: props.classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <div className="pt3 pl3 pointer" onClick={props.toggleDrawer}>
          <Close />
        </div>
        <Typography
          variant="h2"
          style={{
            textAlign: 'center',
            marginTop: '2em',
            letterSpacing: '.3em'
          }}
          gutterBottom
        >
          FILTERS
        </Typography>
        <FilterListComp
          toggleFilter={props.toggleFilter}
          state={props.state}
          handleSelectCost={props.handleSelectCost}
          handleSelectSource={props.handleSelectSource}
        />
      </Drawer>
      <main className={props.classes.content}>
        <div
          style={{
            backgroundColor: '#f5f5f5'
          }}
          className="vh-100 dt w-100 tc cover"
        >
          <div className="mt3">
            {props.searchFetching ? (
              <CircularProgress className={props.classes.progress} size={50} />
            ) : resourcesToShow.length > 0 ? (
              map(showCard, resourcesToShow)
            ) : (
              <Paper style={{ padding: '2em', width: '90%', margin: '0 auto' }}>
                <div>No resources were found that match your search.</div>
              </Paper>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
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
            <img src="https://file-tojimaepbm.now.sh/" />
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
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      searchFetching: false,
      searchText: '',
      tools: true,
      'data-visualizations': true,
      'community-resources': true,
      insurance: true,
      sources: [],
      cost: '',
      categoriesToShow: [],
      drawerOpen: false,
      address: ''
    }
  }

  toggleDrawer = () => {
    const updatedValue = not(prop('drawerOpen', this.state))
    const updatedState = assoc('drawerOpen', updatedValue, this.state)
    this.setState(updatedState)
  }


  componentDidMount = () => {
    this.handleSearchRequest({ preventDefault: () => {}, initial: true })
    this.setState({
      categoriesToShow: [
        'data-visualizations',
        'community-resources',
        'tools',
        'insurance'
      ]
    })
  }

  handleSearchChange = e => {
    this.setState({ searchText: e.target.value })
  }

  handleSearchRequest = e => {
    e.preventDefault()

    const handlers = {
      handleStart: () =>
        this.setState({ searchFetching: e.initial ? false : true }),
      handleResult: searchResults => {
        this.setState({ searchResults, searchFetching: false })
      },
      handleError: err => console.log('err!', err)
    }
    performSearch(handlers)(this.state.searchText)
  }

  toggleFilter = type => () => {
    const updatedValue = not(prop(type, this.state))
    const updatedState = assoc(type, updatedValue, this.state)
    const updatedValObj = objOf(type, updatedValue)

    const categoriesToShow = map(
      head,
      filter(
        nth(1),
        toPairs(
          merge(
            pick(
              [
                'tools',
                'data-visualizations',
                'community-resources',
                'insurance'
              ],
              this.state
            ),
            updatedValObj
          )
        )
      )
    )

    this.setState(merge(updatedState, { categoriesToShow }))
  }

  handleSelectSource = event => {
    this.setState({ sources: event.target.value })
  }

  handleSelectCost = event => {
    this.setState({ cost: event.target.value })
  }

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
                <SearchComp
                  handleSearchRequest={this.handleSearchRequest}
                  searchResults={this.state.searchResults}
                  searchFetching={this.state.searchFetching}
                  classes={this.props.classes}
                  searchText={this.state.searchText}
                  toggleDrawer={this.toggleDrawer}
                  handleSearchChange={this.handleSearchChange}
                  toggleFilter={this.toggleFilter}
                  state={this.state}
                  handleSelectCost={this.handleSelectCost}
                  handleSelectSource={this.handleSelectSource}
                  drawerOpen={this.state.drawerOpen}
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
