import algoliasearch from 'algoliasearch'

export const performSearch = (
  { handleStart, handleResult, handleError },
  simulateError = false
) => searchTerm => {
  handleStart && handleStart()

  var client = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  )
  var index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_ID)

  // firstname
  index.search(searchTerm, function(err, content) {
    console.log('content', content)
    handleResult(content.hits)
  })

  setTimeout(() => {
    if (simulateError) {
      const err = new Error('Oh Noes! Something bad happened')
      handleError && handleError(err)
      return
    }
  }, 1200)
}
