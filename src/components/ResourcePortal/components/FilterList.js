import React from 'react'
import PropTypes from 'prop-types'
import {
  List,
  ListItemIcon,
  Checkbox,
  ListItem,
  ListItemText,
} from '@material-ui/core'

export default class extends React.Component {
  static displayName = 'ResourcePortalFilterList'
  static propTypes = {
    categories: PropTypes.shape({
      'data-visualizations': PropTypes.bool,
      'community-resources': PropTypes.bool,
      tools: PropTypes.bool,
      insurance: PropTypes.bool,
    }).isRequired,
    toggleCategory: PropTypes.func.isRequired,
  }

  render() {
    const { categories, toggleCategory } = this.props

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
