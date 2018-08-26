import React, { Fragment } from 'react'
import ContainerDimensions from 'react-container-dimensions'
import { DateTime } from 'luxon'
import { compose, map, prop, pluck } from 'ramda'
import Map from './Map'
import MapSearch from './MapSearch'
import MapSlider from './MapSlider'

import fetchTides from '../data/tides'
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
      ts: {
        initialized: false,
        idx: -1,
        markers: [],
        tides: [],
        precip: []
      },
      zoom: props.zoom || 16.5,
      extraLayers: [FloodLayers[0]]
    }

    this.submit = this.submit.bind(this)
    this.initTS = this.initTS.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.updateTSMarker = this.updateTSMarker.bind(this)
    this.updateViewport = this.updateViewport.bind(this)
  }

  componentDidMount () {
    this.initTS()
  }

  async initTS () {
    const t = DateTime.local().minus({hours: 5 })
    const tides = await fetchTides({start: t})
    console.log(tides)

    const extractMarkers = compose(
      map(str => new DateTime.fromFormat(str, 'yyyy-MM-dd HH:mm')),
      pluck('t'),
      prop('data')
    )
    const extractTides = compose(
      map(i => Number(i)),
      pluck('v'),
      prop('data')
    )

    const markers = extractMarkers(tides)

    this.setState({
      ts: {
        initialized: true,
        idx: Math.floor(markers.length / 2),
        markers,
        tides: extractTides(tides),
        precip: []
      }
    })
  }

  render () {
    return(
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
                latitude={this.state.latitude || 32.772276}
                longitude={this.state.longitude || -79.93131}
                pitch={this.state.pitch}
                zoom={this.state.zoom}
                height={height}
                width={width}
                onViewportChange={this.updateViewport}
                mapStyle='mapbox://styles/brychappell/cjl9wskda0hxb2snvpjum5jve'
                opacity={90}
              />
              <div className="absolute bottom-1 pa1">
                {this.state.ts.initialized && this.renderSlider(this.state)}
              </div>
            </Fragment>
          )}
        </ContainerDimensions>
      </div>
    )
  }

  renderSlider () {
    const { idx, markers, tides } = this.state.ts
    const tsLabel = markers[idx].toLocaleString(DateTime.DATETIME_FULL)

    return (
      <MapSlider
        value={idx}
        min={0}
        max={markers.length - 1}
        step={1}
        onChange={(_, idx) => this.setState({ ts: { ...this.state.ts, idx } })}
        tsLabel={tsLabel}
        tideValue={tides[idx]}
      />
    )
  }

  submit (evt) {
    evt.preventDefault()
    console.log(evt)
  }

  updateSearch(evt) {
    this.setState({ search: { ...this.state.search, q: evt.target.value } })
  }

  updateTSMarker () {
    // TODO:
  }

  updateViewport (viewport) {
    console.log(viewport)
    this.setState(viewport)
  }
}
