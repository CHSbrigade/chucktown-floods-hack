import React, { Fragment } from 'react'
import ContainerDimensions from 'react-container-dimensions'
import Map from './Map'
import MapSearch from './MapSearch'

import FloodLayers from '../data/flood-layers.json'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: props.latitude || 32.772276,
      longitude: props.longitude || -79.931310,
      pitch: 45,
      search: {
        q: ''
      },
      zoom: props.zoom || 16.5,
      extraLayers: [FloodLayers[0]],
    }

    this.submit = this.submit.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.updateViewport = this.updateViewport.bind(this)
  }

  render () {
    return(
      <div style={{ height: '100vh', width: '100vw' }}>
        <ContainerDimensions>
          {({width, height}) => (
            <Fragment>
              <div className="absolute top-1 left-1 z-1 pa1">
                <MapSearch
                  onChange={this.updateSearch}
                  onSubmit={this.submit}
                  value={this.state.search.q}
                />
              </div>
              <Map
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                pitch={this.state.pitch}
                zoom={this.state.zoom}
                height={height}
                width={width}
                onViewportChange={this.updateViewport}
                extraLayers={this.state.extraLayers}
              />
            </Fragment>
          )}
        </ContainerDimensions>
      </div>
    )
  }

  submit (evt) {
    evt.preventDefault()
    console.log(evt)
  }

  updateSearch (evt) {
    this.setState({ search: { ...this.state.search, q: evt.target.value } })
  }

  updateViewport (viewport) {
    this.setState({ ...viewport })
  }
}
