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
import { prop, map, __, head, propOr, isEmpty } from 'ramda'

const styles = theme => ({
  card: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'left'
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
    width: 60,
    height: 60
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

    const AvaWar = props => {
      const images = propOr([], 'images', this.props)
      return isEmpty(images) ? (
        <Avatar className={classes.purpleAvatar}>{head(props.title)}</Avatar>
      ) : (
        <Avatar aria-label="" src={head(images)} className={classes.avatar} />
      )
    }

    const categoriesMap = prop(__, {
      'data-visualizations': 'Data Visualizations',
      'community-resources': 'Community Resources',
      tools: 'Tools',
      insurance: 'insurance'
    })

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<AvaWar {...this.props} />}
          action={
            <IconButton>
              <a
                style={{ textDecoration: 'none' }}
                href={this.props.url}
                target="_blank"
              >
                <OpenInNew style={{ textDecoration: 'none', color: 'black' }} />
              </a>
            </IconButton>
          }
          title={this.props.title}
          subheader={this.props.categories
            .map(x => categoriesMap(x))
            .join(' | ')}
        />

        <CardContent style={{ borderTop: '1px solid lightgray' }}>
          <Typography variant="subheading" gutterBottom>
            Categories
          </Typography>
          <Typography component="p">
            {/* {map(
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
            )} */}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ResultCard)
