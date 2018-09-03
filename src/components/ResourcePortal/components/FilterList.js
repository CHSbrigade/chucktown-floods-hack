import React from 'react'
import {
  List,
  ListItemIcon,
  Checkbox,
  ListItem,
  ListItemText,
} from '@material-ui/core'

export default class extends React.Component {
  render() {
    const {
      toggleFilter,
      state,
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
