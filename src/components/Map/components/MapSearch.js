import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import PlacesAutocomplete from 'react-places-autocomplete'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'

export default props => (
  <Paper
    elevation={1}
    style={{
      width: '100%',
      padding: '1.5em',
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    <div className="w-100">
      <Link to="/">
        <KeyboardBackspace
          style={{ position: 'relative', top: '15px', right: '5px' }}
        />
      </Link>
      <form style={{ width: '90%', float: 'right' }}>
        <PlacesAutocomplete
          value={props.address}
          onChange={props.handleAddressChange}
          onSelect={props.handleAddressSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div style={{ width: '100%', display: 'inline-block' }}>
              <input
                {...getInputProps({
                  placeholder: `try "Boomtown"`,
                  className: 'location-search-input'
                })}
                style={{ padding: '1em', width: '100%' }}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: '#fafafa',
                        cursor: 'pointer',
                        marginTop: '1em',
                        fontFamiliy: 'roboto'
                      }
                    : {
                        backgroundColor: '#ffffff',
                        marginTop: '1em',
                        fontFamiliy: 'roboto',
                        cursor: 'pointer'
                      }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </form>
    </div>
  </Paper>
)
