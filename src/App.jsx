import { useEffect, useState } from 'react'
import { NavBar, Footer } from './components'
import { Outlet, useLocation } from 'react-router-dom'
import { getPathSearchHash } from './utils/locationHelpers'
import { fetchUserIfToken } from './utils/fetches'

// get rid of user after you can fetch user
// const userState = { name: "test", admin: true, activeSub: true, id: 'asdf' }
// const userState = { name: 'test', admin: false, activeSub: true, id: 'asdf' }
// const userState = { name: "test", admin: false, activeSub: false, id: 'asdf' }
// const userState = { noUser: true }
function App() {
  let location = useLocation()
  let [path, search, hash] = getPathSearchHash(location)
  const [user, setUser] = useState({ noUser: true })
  const [token, setToken] = useState(
    localStorage.getItem('token') || localStorage.setItem('token', ''),
    ''
  )
  // console.log(location, path, search, hash)

  useEffect(() => {
    try {
      if (token && user.noUser) fetchUserIfToken(setUser, token)
    } catch (err) {
      if (response.status !== 201)
        throw {
          status: response.status,
          message: 'Something went wrong trying to Sign up.\nPlease try again.'
        }
      console.error(err)
    }
  }, [])

  useEffect(() => {
    try {
      const localToken = localStorage.getItem('token')
      const notUndefined = localToken.toLowerCase() !== 'undefined'
      if (localToken && notUndefined) {
        setToken(localToken)
        const result = fetchUserIfToken(setUser, token)
        if (result === 500) throw result
      } else {
        localStorage.setItem('token', '')
        setToken('')
        setUser({ noUser: true })
      }
    } catch (er) {
      console.error(er)
      if (er === 500) console.log('Error 500, Token incorrect format')
    }
  }, [token])

  const outletState = { state: { user, token }, setters: { setUser, setToken } }
  const navState = { location: [path, search, hash], user, setUser, token, setToken }
  return (
    <>
      <NavBar navState={navState} />
      <Outlet context={outletState} />
      <Footer />
    </>
  )
}

export default App
