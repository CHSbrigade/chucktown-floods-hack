import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import coastToolsData from './coastal-tools.json'
import { map } from 'ramda'
import { performSearch } from './utils'

import Map from './components/Map'
import ResultCard from './components/ResultCard'
import ResourceDetail from './components/ResourceDetail'

const Home = props => {
  console.log('props', props)
  return (
    <div>
      <button onClick={props.handleSearchRequest}>click me</button>
      {map(
        props => (
          <div className="mb2">
            <ResultCard {...props} />
          </div>
        ),
        props.searchResults
      )}
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }
  handleSearchRequest = searchTerm => {
    console.log('wow!')
    const handlers = {
      handleStart: () => console.log('starting!'),
      handleResult: searchResults => {
        console.log('searchResults', searchResults)
        this.setState({ searchResults })
      },
      handleError: err => console.log('err!', err)
    }
    performSearch(handlers)(searchTerm)
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Home
                  searchResults={this.state.searchResults}
                  handleSearchRequest={this.handleSearchRequest}
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

export default App
