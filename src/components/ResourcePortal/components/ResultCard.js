import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import OpenInNew from '@material-ui/icons/OpenInNew'
import BarChart from '@material-ui/icons/BarChart'
import Grade from '@material-ui/icons/Grade'
import Chip from '@material-ui/core/Chip'
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft'
import { prop, map, __, head, propOr, isEmpty, tail } from 'ramda'

const styles = theme => ({
  card: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'left',
    maxWidth: '900px'
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
  static propTypes = {
    classes: PropTypes.shape({
      actions: PropTypes.string,
      avatar: PropTypes.string,
      card: PropTypes.string,
      chip: PropTypes.string,
      purlpleAvatar: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }
  static defaultProps = { images: [] }
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes } = this.props

    const iconMap = prop(__, {
      'data-visualizations': <BarChart />,
      tools: <Grade />,
      tool: <Grade />,
      'community-resources': <FormatAlignLeft />
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
      tool: 'Tools',
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
        />
        <div style={{ borderTop: '1px solid lightgray' }} />

        <CardContent style={{ borderTop: '1px solid lightgray' }}>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <Typography paragraph>{this.props.description}</Typography>
          </Collapse>
        </CardContent>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <div className="flex justify-around">
            {map(img => {
              return (
                <a
                  style={{ textDecoration: 'none' }}
                  href={this.props.url}
                  target="_blank"
                  className="pointer"
                >
                  <img src={img} alt='screenshot' />
                </a>
              )
            }, tail(this.props.images))}
          </div>
        </Collapse>
        <CardActions className={classes.actions} disableActionSpacing>
          <Typography component="p">
            {map(x => {
              return (
                <Chip
                  avatar={<Avatar>{iconMap(x)}</Avatar>}
                  label={categoriesMap(x)}
                  className={classes.chip}
                />
              )
            }, this.props.categories)}
          </Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit />
      </Card>
    )
  }
}

export default withStyles(styles)(ResultCard)
