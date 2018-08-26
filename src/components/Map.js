import React from 'react'
import ReactMapGL from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

export default props =>
  <ReactMapGL
    {...props}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={props.updateViewport}
    mapStyle='mapbox://styles/brychappell/cjl9wskda0hxb2snvpjum5jve'
  />
