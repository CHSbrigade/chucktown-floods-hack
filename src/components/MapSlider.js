import React from 'react'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/lab/Slider'

export default props => (
  <div style={{ width: '100vw', padding: '2rem' }}>
    <Paper className="pa2">
      <Slider value={5} min={0} max={10} step={1} />
    </Paper>
  </div>
)
