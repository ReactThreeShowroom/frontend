// import { useState } from 'react'
import { NavBar, Footer } from './components'
import { Outlet } from 'react-router-dom'

// useDispatch to enter the values to store from fetch

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
