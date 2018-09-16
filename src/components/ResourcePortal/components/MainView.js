import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { map } from 'ramda'
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
import { withStyles } from '@material-ui/core/styles'
import FilterListComp from './FilterList'
import ResultCard from './ResultCard'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: 'black',
  },
})

const MainView = props => {
  const showCard = props => (
    <div key={props.title} className="mb2">
      <ResultCard {...props} />
    </div>
  )

  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: 'rgb(245, 245, 245)',
          zIndex: '5',
          boxShadow: 'none',
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
              style={{ position: 'relative', top: '2px', padding: '.5em' }}
              elevation={1}
            >
              <form onSubmit={props.handleSearchSubmit}>
                <FormControl fullWidth>
                  <Input
                    id="adornment-amount"
                    value={props.search.term}
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
              <Button style={{ position: 'absolute', top: 14, right: 60 }}>
                <Place />
              </Button>
            </Link>
          </Hidden>
          <Button
            style={{ position: 'absolute', top: 14, right: 10 }}
            onClick={props.handleToggleDrawer()}
          >
            <FilterList />
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        onClose={props.handleToggleDrawer(false)}
        open={props.filters.visible}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div
          className="pt3 pl3 pointer"
          onClick={props.handleToggleDrawer(false)}
        >
          <Close />
        </div>
        <Typography
          variant="title"
          style={{
            textAlign: 'center',
            marginTop: '2em',
            letterSpacing: '.3em',
          }}
          gutterBottom
        >
          FILTERS
        </Typography>
        <FilterListComp
          categories={props.filters.categories}
          toggleCategory={props.handleToggleCategory}
        />
      </Drawer>
      <main className={props.classes.content}>
        <div
          style={{
            backgroundColor: '#f5f5f5',
          }}
          className="vh-100 dt w-100 tc cover"
        >
          <div className="mt3">
            {props.search.isFetching ? (
              <CircularProgress className={props.classes.progress} size={50} />
            ) : props.results.length > 0 ? (
              map(showCard, props.results)
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

MainView.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }),
  filters: PropTypes.shape({
    categories: PropTypes.shape({
      'data-visualizations': PropTypes.bool.isRequired,
      'community-resources': PropTypes.bool.isRequired,
      tools: PropTypes.bool.isRequired,
      insurance: PropTypes.bool.isRequired,
    }),
    visible: PropTypes.bool.isRequired,
  }).isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      categories: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      objectID: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  search: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        categories: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        objectID: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
    term: PropTypes.string.isRequired,
  }),
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  handleToggleCategory: PropTypes.func.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
}

export default withStyles(styles)(MainView)
