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
} from '@material-ui/core'
import { map } from 'ramda'
import baseUrls from '../../../base-url.json'

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
                onChange={toggleFilter('tools')}
                checked={state.tools}
              />
            </ListItemIcon>
            <ListItemText primary="Tools" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleFilter('data-visualizations')}
                checked={state['data-visualizations']}
              />
            </ListItemIcon>
            <ListItemText primary="Data Visualizations" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleFilter('community-resources')}
                checked={state['community-resources']}
              />
            </ListItemIcon>
            <ListItemText primary="Community Resources" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleFilter('insurance')}
                checked={state.insurance}
              />
            </ListItemIcon>
            <ListItemText primary="Insurance" />
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}
