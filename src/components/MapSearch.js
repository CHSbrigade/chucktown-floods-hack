import React from 'react';

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import Search from '@material-ui/icons/Search'

export default props =>
  <Paper elevation={1}>
    <form onSubmit={props.onSubmit}>
      <FormControl fullWidth>
        <Input
          id="adornment-amount"
          className="pa1"
          value={props.value || ''}
          onChange={props.onChange}
          disableUnderline={true}
          startAdornment={(
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )}
          style={{ width: '330px'}}
        />
      </FormControl>
    </form>
  </Paper>
