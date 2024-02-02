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
        .map((query) => {
          const [key, val] = query.split('=')
          return { [key]: val }
        })
    : []

export const getHashFromLoc = (location) => {
  return location.hash != '' ? decodeURI(location.hash).slice(1) : ''
}

export const getPathSearchHash = (location) => [
  getPathnameRoot(location),
  getSearchFromLoc(location),
  getHashFromLoc(location)
]
