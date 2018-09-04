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
      categories,
      toggleCategory,
    } = this.props

    return (
      <React.Fragment>
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleCategory('tools')}
                checked={categories.tools}
              />
            </ListItemIcon>
            <ListItemText primary="Tools" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleCategory('data-visualizations')}
                checked={categories['data-visualizations']}
              />
            </ListItemIcon>
            <ListItemText primary="Data Visualizations" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleCategory('community-resources')}
                checked={categories['community-resources']}
              />
            </ListItemIcon>
            <ListItemText primary="Community Resources" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                onChange={toggleCategory('insurance')}
                checked={categories.insurance}
              />
            </ListItemIcon>
            <ListItemText primary="Insurance" />
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}
