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
  InputLabel
} from '../../node_modules/@material-ui/core'
import { map } from 'ramda'
import baseUrls from '../base-url.json'

export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox value="Tools" />
            </ListItemIcon>
            <ListItemText primary="Tools" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox value="Data Visulatization" />
            </ListItemIcon>
            <ListItemText primary="Data Visualizations" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox value="Community Resources" />
            </ListItemIcon>
            <ListItemText primary="Community Resources" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox value="Insurance" />
            </ListItemIcon>
            <ListItemText primary="Insurance" />
          </ListItem>
        </List>
        <FormControl>
          <InputLabel>Cost</InputLabel>
          <Select value={null} onChange={() => {}}>
            <MenuItem value={1}>Free</MenuItem>
            <MenuItem value={2}>Paid</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Source</InputLabel>
          <Select onChange={() => {}}>
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
