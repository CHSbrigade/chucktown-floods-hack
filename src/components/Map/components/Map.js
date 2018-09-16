import React from "react"
import ReactMapGL from "react-map-gl"

import "mapbox-gl/dist/mapbox-gl.css"

export default class extends React.Component {
  render () {
    const { updateViewport, ...restProps } = this.props

    return(
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onError={console.error}
        onViewportCange={updateViewport}
        {...restProps}
        ref={el => this.mapRef = el}
      />
    )
  }
}
