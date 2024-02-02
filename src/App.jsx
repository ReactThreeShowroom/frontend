import { useState } from 'react'
import { NavBar, Footer } from './components'
import { Outlet, useLocation } from 'react-router-dom'
import { getPathSearchHash } from './utils/locationHelpers'

// useDispatch to enter the values to store from fetch

function App() {
  const location = useLocation()
  const [path, search, hash] = getPathSearchHash(location)
  console.log(location, path, search, hash)

  const outletState = { state: {}, setters: {} }

  return (
    <>
      <NavBar location={[path, search, hash]} />
      <Outlet context={outletState} />
      <Footer />
    </>
  )
}

export default App
