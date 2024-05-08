export const getPathnameRoot = (location) =>
  location.pathname !== '/'
    ? `/${
        decodeURI(location.pathname)
          .split('/')
          .filter((seg) => seg !== '')[0]
      }`
    : '/'

export const getSearchFromLoc = (location) =>
  location.search !== ''
    ? decodeURI(location.search)
        .slice(1)
        .split('&')
        .map((query) => ({ [query.split('=')[0]]: query.split('=')[1] }))
    : []

export const getHashFromLoc = (location) =>
  location.hash != '' ? decodeURI(location.hash).slice(1) : ''

export const getPathSearchHash = (location) => [
  getPathnameRoot(location),
  getSearchFromLoc(location),
  getHashFromLoc(location)
]
