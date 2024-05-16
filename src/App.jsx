import { useEffect, useState } from 'react'
import { NavBar, Footer } from './components'
import { Outlet, useLocation } from 'react-router-dom'
import { getPathSearchHash } from './utils/locationHelpers'

// get rid of user after you can fetch user
// const userState = { name: "test", admin: true, activeSub: true, id: 'asdf' }
// const userState = { name: 'test', admin: false, activeSub: true, id: 'asdf' }
// const userState = { name: "test", admin: false, activeSub: false, id: 'asdf' }
// const userState = { noUser: true }
function App() {
  const location = useLocation()
  const [path, search, hash] = getPathSearchHash(location)
  const [user, setUser] = useState({ noUser: true })
  const [token, setToken] = useState(
    localStorage.getItem('token') || localStorage.setItem('token', ''),
    ''
  )
  // console.log(location, path, search, hash)

  useEffect(() => {
    if (token) {
      console.log('token: ', token)
      // get user
      //setUser({ name: 'test', admin: false, activeSub: true, id: 'asdf' })
      try {
        const response = (async () =>
          await fetch('https://api-3frl.onrender.com/user/me', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            }
          }))()
        const result = response.json()
        console.log(result)
      } catch (err) {
        console.error(err)
      }
    }

    // if (!token) localStorage.setItem('token', 'test'), setToken('test') // test user *****
  }, [])
  useEffect(() => {
    console.log('user: ', user)
  }, [user])
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      // set token
      // get user
      //setUser({ name: 'test', admin: false, activeSub: true, id: 'asdf' }) // test user *****
      setToken(localToken)
    } else {
      localStorage.setItem('token', '')
      setToken('')
      setUser({ noUser: true })
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
