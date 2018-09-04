import algoliasearch from 'algoliasearch'

const client = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  )

const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_ID)

/**
 * params searchTerm - term to search
 *
 * returns (on success) result
 * obj.records - first page of hits
 * obj.perPage - what it says
 * obj.totalRecords - total hits found
 * obj.page - current page param
 */
export const performSearch = searchTerm =>
  new Promise((resolve, reject) => {
    index.search(searchTerm, (err, result) => {
      if (err) return reject(err)

      resolve({
        records: result.hits,
        perPage: result.hitsPerPage,
        totalRecords: result.nbHits,
        page: result.page,
      })
    })
  })
