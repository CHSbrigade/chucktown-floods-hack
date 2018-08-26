import React from 'react'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/lab/Slider'

export default props => {
  const { tsLabel, tideValue, ...sliderProps } = props

  return (
    <div style={{ width: '100vw', padding: '2rem' }}>
      <Paper className="pa2">
        <Slider {...sliderProps} />
        <p className="tc fw2 f6">
          Date: {tsLabel}
          <br />
          Tide: {tideValue} ft
        </p>
      </Paper>
    </div>
  )
}
