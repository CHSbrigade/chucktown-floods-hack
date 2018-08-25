import React from 'react'
import ContainerDimensions from 'react-container-dimensions'
import Map from './Map'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: props.latitude || 32.7765,
      longitude: props.longitude || -79.9311,
      zoom: props.zoom || 13,
    }

    this.updateViewport = this.updateViewport.bind(this)
  }

  render () {
    return(
      <div style={{ height: '100vh', width: '100vw' }}>
        <ContainerDimensions>
          {({width, height}) => (
            <Map
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              zoom={this.state.zoom}
              height={height}
              width={width}
              onViewportChange={this.updateViewport}
            />
          )}
        </ContainerDimensions>
      </div>
    )
  }

  updateViewport (viewport) {
    this.setState({ ...viewport })
  }
}
