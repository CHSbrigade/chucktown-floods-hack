import React from 'react'
import { find, propEq } from 'ramda'
import { default as data } from '../coastal-tools.json'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.resource = find(propEq('id', Number(props.match.params.id)), data)
  }

  render () {
    return(
      <ul>
        <li>Id: {this.resource.id}</li>
        <li>Title: {this.resource.title}</li>
        <li>URL: {this.resource.url}</li>
      </ul>
    )
  }
}
