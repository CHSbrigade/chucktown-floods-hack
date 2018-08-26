import React, { Fragment } from 'react'
import ContainerDimensions from 'react-container-dimensions'
import Map from './Map'
import MapSearch from './MapSearch'
import MapSlider from './MapSlider'

import FloodLayers from '../data/flood-layers.json'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: props.lat || 32.772276,
      longitude: props.lng || -79.93131,
      pitch: 45,
      search: {
        q: ''
      },
      zoom: props.zoom || 16.5,
      extraLayers: [FloodLayers[0]]
    }

    this.submit = this.submit.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.updateViewport = this.updateViewport.bind(this)
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <ContainerDimensions>
          {({ width, height }) => (
            <Fragment>
              <div
                className="absolute top-1 left-1 z-1 pa1"
                style={{ width: '50%', minWidth: 350 }}
              >
                <MapSearch
                  onChange={this.updateSearch}
                  onSubmit={this.submit}
                  value={this.state.search.q}
                  handleAddressChange={this.props.handleAddressChange}
                  handleAddressSelect={this.props.handleAddressSelect}
                  address={this.props.address}
                />
              </div>
              <Map
                latitude={this.props.lat || 32.772276}
                longitude={this.props.lng || -79.93131}
                pitch={this.state.pitch}
                zoom={this.state.zoom}
                height={height}
                width={width}
                onViewportChange={this.updateViewport}
                extraLayers={this.state.extraLayers}
              />
              <div className="absolute bottom-1 pa1">
                <MapSlider />
              </div>
            </Fragment>
          )}
        </ContainerDimensions>
      </div>
    )
  }

  submit(evt) {
    evt.preventDefault()
    console.log(evt)
  }

  updateSearch(evt) {
    this.setState({ search: { ...this.state.search, q: evt.target.value } })
  }

  updateViewport(viewport) {
    this.setState({ ...viewport })
  }
}
