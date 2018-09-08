import React from 'react'
import DataProvider from './components/DataProvider'
import MainView from './components/MainView'

export default extraProps => (
  <DataProvider render={data => <MainView {...data} {...extraProps} />} />
)
