import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import BeachAccess from '@material-ui/icons/BeachAccess'
import OpenInNew from '@material-ui/icons/OpenInNew'
import Chip from '@material-ui/core/Chip'
import { prop, map, __ } from 'ramda'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  chip: {
    margin: theme.spacing.unit
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
})

class ResultCard extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes } = this.props

    const iconMap = prop(__, {
      coastal: <BeachAccess />
    })

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <a
                style={{ textDecoration: 'none', color: 'black !important' }}
                href={this.props.url}
                target="_blank"
              >
                <OpenInNew />
              </a>
            </IconButton>
          }
          title={this.props.title}
          subheader="Tools"
        />
        <CardContent style={{ borderTop: '1px solid lightgray' }}>
          <Typography variant="subheading" gutterBottom>
            Categories
          </Typography>
          <Typography component="p">
            {map(
              x => {
                return (
                  <Chip
                    avatar={<Avatar>{iconMap(x)}</Avatar>}
                    label={x}
                    className={classes.chip}
                  />
                )
              },
              ['coastal']
            )}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ResultCard)
