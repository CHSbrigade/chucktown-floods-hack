import React from 'react'
import fetchTides from '../data/tides'

export default class extends React.Component {
  state = {
    isFetching: false,
  }

  componentDidMount () {
    this.setState({ isFetching: true })

    fetchTides()
      .then(data => this.setState({ data, isFetching: false }))
      .catch(e => {
        console.error(e)
        this.setState({ isFetching: false })
      })
  }

  render () {
    const { data, isFetching } = this.state

    return (
      <div>
        {data}
        {isFetching && 'Fetching tidal data...'}
      </div>
    )
  }
}
