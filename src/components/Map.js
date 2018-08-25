import React from 'react'
import ReactMapGL from 'react-map-gl'
import ContainerDimensions from 'react-container-dimensions'

import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      viewport: {
        latitude: 32.7765,
        longitude: -79.9311,
        zoom: 13,
      }
    }

    this.updateViewport = this.updateViewport.bind(this)
  }

  render () {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <ContainerDimensions>
          {({width, height}) => {
            return (
              <ReactMapGL
                id='map'
                height={height}
                width={width}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={this.updateViewport}
                {...this.state.viewport }
              />
            )
          }}
        </ContainerDimensions>
      </div>
    )
  }

  updateViewport (viewport) {
    this.setState({ viewport })
  }
}

export default Map
