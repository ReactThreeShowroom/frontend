import { useState } from 'react'
import { NavBar, Footer } from './components'
import { Outlet, useLocation } from 'react-router-dom'
import { getPathSearchHash } from './utils/locationHelpers'

// get rid of user after you can fetch user
// const userState = { name: "test", admin: true, activeSub: true, id: 'asdf' }
const userState = { name: 'test', admin: false, activeSub: true, id: 'asdf' }
// const userState = { name: "test", admin: false, activeSub: false, id: 'asdf' }
// const userState = { noUser: true }
function App() {
  const location = useLocation()
  const [path, search, hash] = getPathSearchHash(location)
  const [user, setUser] = useState(userState || { noUser: true })
  console.log(location, path, search, hash)

  const outletState = { state: { user }, setters: { setUser } }
  const navState = { location: [path, search, hash], user, setUser }
  return (
    <>
      <NavBar navState={navState} />
      <Outlet context={outletState} />
      <Footer />
    </>
  )
}

export default App
