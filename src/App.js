import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import coastToolsData from './coastal-tools.json'
import { map } from 'ramda'
import { performSearch } from './utils'
import bg from './assets/bg.png'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Map from './components/Map'
import ResultCard from './components/ResultCard'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Search from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'
import Grid from '@material-ui/core/Grid'
import ResourceDetail from './components/ResourceDetail'
import { withRouter } from 'react-router'
import algoliasearch from 'algoliasearch'

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
  rootSearch: {
    flexGrow: 1
  },
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
  }
})

const SearchComp = props => {
  return (
    <div>
      <div className={props.classes.rootSearch}>
        <AppBar
          position="static"
          style={{
            backgroundColor: 'white',
            zIndex: '5',
            boxShadow: 'none',
            borderBottom: '1px solid lightgray'
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
              <Paper className={props.classes.inputAppBar} elevation={1}>
                <form onSubmit={props.handleSearchRequest}>
                  <FormControl fullWidth className={props.classes.margin}>
                    <Input
                      id="adornment-amount"
                      value={props.searchText}
                      onChange={props.handleSearchChange}
                      disableUnderline={true}
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
          </Toolbar>
        </AppBar>
        <div className={props.classes.rootGrid}>
          <Grid
            container
            spacing={24}
            style={{
              position: 'relative',
              top: '12px'
              // zIndex: -1
            }}
          >
            <Grid
              xs={9}
              style={{
                backgroundColor: '#f5f5f5'
              }}
              className="vh-100 dt w-100 tc cover"
            >
              <div className="mt3">
                {props.searchFetching ? (
                  <CircularProgress
                    className={props.classes.progress}
                    size={50}
                  />
                ) : (
                  map(
                    props => (
                      <div className="mb2">
                        <ResultCard {...props} />
                      </div>
                    ),
                    props.searchResults
                  )
                )}
              </div>
            </Grid>
            <Grid className="vh-100 dt w-100 tc cover" item xs={3}>
              <Typography variant="subheading" gutterBottom>
                Filters
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      )
    </div>
  )
}

const Home = props => (
  <div>
    {props.searchFetching ? (
      <Redirect to="/search" />
    ) : (
      <div
        className="vh-100 dt w-100 tc bg-dark-gray white cover"
        style={{ background: `url(${bg}) no-repeat center` }}
      >
        <div className="dtc v-mid">
          <header className="white-70" />
          <div className="w-50 center">
            <h2 className="f2 fw1 i white">
              Search For Flooding Related Material in The Greater Charleston
              Area
            </h2>
          </div>
          <div>
            <Paper className={props.classes.root} elevation={1}>
              <form onSubmit={props.handleSearchRequest}>
                <FormControl fullWidth className={props.classes.margin}>
                  <Input
                    id="adornment-amount"
                    value={props.searchText}
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      searchFetching: false,
      searchText: ''
    }
  }

  handleSearchChange = e => {
    this.setState({ searchText: e.target.value })
  }

  handleSearchRequest = e => {
    e.preventDefault()

    // var client = algoliasearch('62T98J3F05', 'a25dce6b2ca36b908fabd00d96feb813')
    // var index = client.initIndex('data_1')

    // // firstname
    // index.search(this.state.searchText, function(err, content) {
    //   console.log('content', content)
    //   this.setState({})
    // })

    const handlers = {
      handleStart: () => this.setState({ searchFetching: true }),
      handleResult: searchResults => {
        this.setState({ searchResults, searchFetching: false })
      },
      handleError: err => console.log('err!', err)
    }
    performSearch(handlers)(this.state.searchText)
  }

  render() {
    console.log('state', this.state)
    return (
      <div className="App">
        <BrowserRouter>
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
                  searchResults={this.state.searchResults}
                  searchFetching={this.state.searchFetching}
                  classes={this.props.classes}
                  searchText={this.state.searchText}
                  handleSearchChange={this.handleSearchChange}
                />
              )}
            />
            <Route exact path="/map" component={Map} />
            <Route path="/resource/:id" component={ResourceDetail} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default withStyles(styles)(App)
