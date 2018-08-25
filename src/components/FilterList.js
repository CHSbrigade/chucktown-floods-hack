import React from 'react'
import {
  List,
  ListItemIcon,
  Checkbox,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input
} from '../../node_modules/@material-ui/core'
import { map } from 'ramda'
import baseUrls from '../base-url.json'

export default class extends React.Component {
  render() {
    const {
      toggleFilter,
      state,
      handleSelectCost,
      handleSelectSource
    } = this.props
    return (
      <React.Fragment>
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleFilter('toolsFilter')}
                checked={state.toolsFilter}
              />
            </ListItemIcon>
            <ListItemText primary="Tools" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleFilter('dataVisualizationsFilter')}
                checked={state.dataVisualizationsFilter}
              />
            </ListItemIcon>
            <ListItemText primary="Data Visualizations" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleFilter('communityResourcesFilter')}
                checked={state.communityResourcesFilter}
              />
            </ListItemIcon>
            <ListItemText primary="Community Resources" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleFilter('insuranceFilter')}
                checked={state.insuranceFilter}
              />
            </ListItemIcon>
            <ListItemText primary="Insurance" />
          </ListItem>
        </List>
        <FormControl>
          <InputLabel>Cost</InputLabel>
          <Select value={state.cost} onChange={handleSelectCost}>
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="select-multiple">Source</InputLabel>
          <Select
            multiple
            onChange={handleSelectSource}
            value={state.sources}
            input={<Input id="select-multiple" />}
          >
            {map(
              url => (
                <MenuItem value={url}>{url}</MenuItem>
              ),
              baseUrls
            )}
          </Select>
        </FormControl>
      </React.Fragment>
    )
  }
}
