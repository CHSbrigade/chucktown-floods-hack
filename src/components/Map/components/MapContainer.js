import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ContainerDimensions from 'react-container-dimensions'
import { DateTime } from 'luxon'
import { compose, map, prop, pluck } from 'ramda'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Map from './Map'
import MapSearch from './MapSearch'
import MapSlider from './MapSlider'

import fetchTides from '../lib/tides'

export default class extends React.Component {
  static displayName = 'MapContainer'
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    zoom: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      address: '',
      latitude: props.lat || 32.772276,
      longitude: props.lng || -79.93131,
      pitch: 45,
      ts: {
        initialized: false,
        idx: -1,
        markers: [],
        tides: [],
        precip: [],
      },
      zoom: props.zoom || 16.5,
    }

    this.initTS = this.initTS.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
    this.updateViewport = this.updateViewport.bind(this)
  }

  componentDidMount() {
    this.initTS()
  }

  async initTS() {
    const t = DateTime.local().minus({ hours: 5 })
    const tides = await fetchTides({ start: t })

    const extractMarkers = compose(
      // eslint-disable-next-line new-cap
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
        precip: [],
      },
    })
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
                  address={this.state.address}
                  handleAddressChange={this.handleAddressChange}
                  handleAddressSelect={this.handleAddressSelect}
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
                mapStyle="mapbox://styles/brychappell/cjl9wskda0hxb2snvpjum5jve"
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

  renderSlider() {
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

  handleAddressChange = address => {
    this.setState({ address })
  }

  async handleAddressSelect(address) {
    this.setState({ address: address })

    try {
      const results = await geocodeByAddress(address)
      const { lat: latitude, lng: longitude } = await getLatLng(results[0])

      this.setState({
        latitude,
        longitude,
      })
    } catch (err) {
      console.error(err)
    }
  }

  updateViewport(viewport) {
    this.setState(viewport)
  }
}
