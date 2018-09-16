import fetch from 'isomorphic-fetch'
import { DateTime } from 'luxon'
import { compose, join, map, toPairs } from 'ramda'

export default ({ start, end } = {}) => {
  const url = `${config.baseUrl}?${queryParams({
    ...config.defaultParams,
    begin_date: formatTs(beginTs(start)),
    end_date: formatTs(endTs(end)),
  })}`

  return fetch(url).then(res => res.json())
}

const config = {
  baseUrl: 'https://tidesandcurrents.noaa.gov/api/datagetter',
  defaultParams: {
    datum: 'MTL',
    format: 'json',
    product: 'water_level',
    station: '8665530',
    time_zone: 'lst',
    units: 'english',
  },
}

const queryParams = compose(
  encodeURI,
  join('&'),
  map(([k, v]) => `${k}=${v}`),
  toPairs
)

const formatTs = ts => ts.toFormat('yyyyMMdd HH:mm')

const beginTs = ts => ts || DateTime.local().minus({ hours: 5 })

const endTs = ts => ts || DateTime.local()
