import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  contains,
  filter,
  intersection,
  length,
  map,
} from 'ramda'
import {
  AppBar,
  Button,
  CircularProgress,
  Drawer,
  FormControl,
  Hidden,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core'
import {
  Close,
  FilterList,
  KeyboardBackspace,
  Place,
  Search,
} from '@material-ui/icons'
import FilterListComp from './FilterList'
import ResultCard from './ResultCard'

const fn = props => {
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

const ALL_CATEGORIES = [
  'data-visualzations',
  'community-resources',
  'tools',
  'insurance',
]

fn.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired,
    flex: PropTypes.string.isRequired,
    inputAppBar: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    rootGrid: PropTypes.string.isRequired,
  }),
  drawerOpen: PropTypes.bool.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchRequest: PropTypes.func.isRequired,
  handleSelectCost: PropTypes.func.isRequired,
  handleSelectSource: PropTypes.func.isRequired,
  searchFetching: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    objectID: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  })),
  searchText: PropTypes.string.isRequired,
  state: PropTypes.shape({
    state: {
      address: PropTypes.string,
      categoriesToShow: PropTypes.arrayOf(PropTypes.string),
      'community-resources': PropTypes.bool,
      cost: PropTypes.string,
      'data-visualizations': PropTypes.bool,
      drawerOpen: PropTypes.bool,
      insurance: PropTypes.bool,
      searchFetching: PropTypes.bool,
      searchResults: PropTypes.arrayOf(PropTypes.shape({
        categories: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        objectID: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
      })),
      searchText: PropTypes.string,
      sources: PropTypes.array,
      tools: PropTypes.bool,
    }
  }),
  toggleDrawer: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
}

fn.defaultProps = {
  drawerOpen: false,
  searchFetching: false,
  searchResults: [],
  searchText: '',
  state: {
    categoriesToShow: ALL_CATEGORIES
  }
}

export default fn
