import React from 'react'
import DataProvider from './components/DataProvider'
import MainView from './components/MainView'

const ResourcePortal = extraProps => (
  <DataProvider render={data => <MainView {...data} {...extraProps} />} />
)

ResourcePortal.displayName = 'ResourcePortal'

export default ResourcePortal
