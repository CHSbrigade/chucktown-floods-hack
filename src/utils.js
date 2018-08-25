import { default as data } from './coastal-tools.json'
import algoliasearch from 'algoliasearch'

export const performSearch = (
  { handleStart, handleResult, handleError },
  simulateError = false
) => searchTerm => {
  handleStart && handleStart()

  var client = algoliasearch('62T98J3F05', 'a25dce6b2ca36b908fabd00d96feb813')
  var index = client.initIndex('data_1')

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
