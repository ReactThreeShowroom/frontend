// import { useState } from 'react'
import { NavBar } from './components'
import { Outlet } from 'react-router-dom'

// useDispatch to enter the values to store from fetch

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
