import React from 'react'
import PropTypes from 'prop-types'
import {
  any,
  assoc,
  assocPath,
  compose,
  contains,
  filter,
  identity,
  keys,
  map,
  propOr,
} from 'ramda'
import { performSearch } from '../lib/search'

export default class extends React.Component {
  static displayName = 'ResourcePortalDataProvider'
  static propTypes = {
    render: PropTypes.func.isRequired,
  }

  state = {
    filters: {
      categories: {
        'data-visualizations': true,
        'community-resources': true,
        tools: true,
        insurance: true,
      },
      visible: false,
    },
    results: [],
    search: {
      isFetching: false,
      results: [],
      term: '',
    },
  }

  constructor() {
    super()

    this.filterResults = this.filterResults.bind(this)
    this.executeSearch = this.executeSearch.bind(this)
    this.setSearch = this.setSearch.bind(this)
    this.toggleCategory = this.toggleCategory.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  componentDidMount() {
    this.executeSearch()
  }

  render() {
    return this.props.render({
      ...this.state,
      handleSearchChange: this.setSearch,
      handleSearchSubmit: this.executeSearch,
      handleToggleCategory: this.toggleCategory,
      handleToggleDrawer: this.toggleDrawer,
    })
  }

  async executeSearch(evt) {
    evt && evt.preventDefault()
    this.setState(assocPath(['search', 'isFetching'], true, this.state))

    try {
      const { records } = await performSearch(this.state.search.term)

      this.setState(
        compose(
          state => assoc('results', this.filterResults(state), state),
          assocPath(['search', 'isFetching'], false),
          assocPath(['search', 'results'], records)
        )(this.state)
      )
    } catch (err) {
      this.setState(assocPath(['search', 'isFetching'], false, this.state))
      throw err
    }
  }

  filterResults(state) {
    const categoriesToShow = compose(
      keys,
      filter(identity)
    )((state || this.state).filters.categories)
    const matchesAnyCategory = compose(
      any(identity),
      map(category => contains(category, categoriesToShow)),
      propOr([], 'categories')
    )

    return filter(matchesAnyCategory, (state || this.state).search.results)
  }

  setSearch(evt) {
    evt.preventDefault()
    const newTerm = evt.target.value
    if (newTerm === this.state.search.text) return

    this.setState(assocPath(['search', 'term'], newTerm, this.state))
  }

  toggleCategory(category) {
    return () => {
      const currentValue = this.state.filters.categories[category]
      if (currentValue == null) return

      const newState = compose(
        state => assoc('results', this.filterResults(state), state),
        assocPath(['filters', 'categories', category], !currentValue)
      )(this.state)

      this.setState(newState)
    }
  }

  toggleDrawer(open = null) {
    return () => {
      const nextVisibility = open == null ? !this.state.filters.visible : open

      this.setState(
        assocPath(['filters', 'visible'], nextVisibility, this.state)
      )
    }
  }
}
