import { default as data } from './coastal-tools.json'

const mockSearchResult = () => data.sort(() => .5 - Math.random())

export const performSearch = ({
  handleStart,
  handleResult,
  handleError
}, simulateError = false) => searchTerm => {
  handleStart && handleStart()

  setTimeout(() => {
    if (simulateError) {
      const err = new Error('Oh Noes! Something bad happened')
      handleError && handleError(err)
      return
    }

    console.log('yay', )

    handleResult(mockSearchResult())
  }, 1200)
}
