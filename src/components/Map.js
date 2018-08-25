import React from 'react'
import ReactMapGL from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

export default class extends React.Component {
  constructor () {
    super()

    this.state = {
      viewport: {
        height: 800,
        width: 800,
        latitude: 32.7765,
        longitude: -79.9311,
        zoom: 10,
      }
    }

    this.updateViewport = this.updateViewport.bind(this)
  }

  render () {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={this.updateViewport}
      />
    )
  }

  updateViewport (viewport) {
    this.setState({ viewport })
  }
}
