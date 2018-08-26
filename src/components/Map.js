import React from "react"
import ReactMapGL from "react-map-gl"
import { fromJS } from "immutable"
import { concat } from "ramda"

import BaseStyle from "../data/map-style.json"

import "mapbox-gl/dist/mapbox-gl.css"

export default class extends React.Component {
  constructor () {
    super()
    this.appendLayers = this.appendLayers.bind(this)
  }

  componentDidMount () {
    const mapEl = this.mapRef.getMap()
    const bounds = mapEl.getBounds()
    const rect = {
      north: bounds._ne.lat,
      south: bounds._sw.lat,
      west: bounds._sw.lng,
      east: bounds._ne.lng,
    }

    // TODO: this is where we want to fetc
  }

  render () {
    const { layers, ...restProps } = this.props

    return(
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onError={console.error}
        onViewportCange={this.props.updateViewport}
        mapStyle={this.appendLayers()}
        {...restProps}
        ref={el => this.mapRef = el}
      />
    )
  }

  appendLayers () {
    const { layers, ...restBaseStyle } = BaseStyle

    return(fromJS({
      ...restBaseStyle,
      layers: concat(layers, this.props.extraLayers)
    }))
  }
}
