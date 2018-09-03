import React from "react"
import ReactMapGL from "react-map-gl"
import { forEach } from "ramda"

import "mapbox-gl/dist/mapbox-gl.css"

export default class extends React.Component {
  static defaultProps = {
    opacity: 0.5
  }

  constructor () {
    super()
    this.applyOpacity = this.applyOpacity.bind(this)
  }

  render () {
    const { opacity, ...restProps } = this.props

    return(
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onLoad={this.applyOpacity}
        onError={console.error}
        onViewportCange={this.props.updateViewport}
        {...restProps}
        ref={el => this.mapRef = el}
      />
    )
  }

  applyOpacity () {
    const { opacity } = this.props
    const layerIds = ['flood 1', 'flood 2', 'flood 3']
    const mapEl = this.mapRef.getMap()

    forEach(id => mapEl.setPaintProperty(id, 'opacity', opacity), layerIds)
  }
}
