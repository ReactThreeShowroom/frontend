// import { useState } from 'react'
import { useEffect } from 'react'
import { NavBar, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from './slices/authSlice'

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
