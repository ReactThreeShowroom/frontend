import { useNavigate } from 'react-router-dom'
import { getNav } from '../utils/maps'
import { useEffect, useState } from 'react'

const nav = [
  { value: 'Home', path: '/', dep: [] },
  { value: 'Admin', path: '/admin', dep: ['id', 'admin'] },
  { value: 'Account', path: '/account', dep: ['id'] },
  { value: 'Sign Up', path: '/signup', dep: [] },
  { value: 'Sign In', path: '/signin', dep: [] }
]

const NavBar = ({ navState: { location, token, setToken, user, setUser } }) => {
  const navigate = useNavigate()
  const [pathname, search, hash] = location
  const [linksMap, setLinksMap] = useState(getNav(nav, pathname, user))

  useEffect(() => {
    setLinksMap(getNav(nav, pathname, user))
  }, [user, pathname])

  return (
    <header id="headContainer" className="flex-col m-0 p-0">
      <nav
        id="navContainer"
        className="flex flex-col md:flex-row lg:flex-row justify-around items-center">
        <div
          className={'flex flex-row items-center my-1 hover:cursor-pointer'}
          onClick={() => {
            navigate('/')
          }}>
          <img id="homeIconGun" src={'/images/Icon.png'} className="h-[50px] lg:h-[100px] mr-2" />
          <img id="homeIconKM" src={'/images/KOTEMASTER-Only.svg'} className="h-[28px]" />
        </div>
        <div className={'w-1/2 flex flex-row flex-wrap justify-between items-center'}>
          {linksMap}
          {!!user.id && (
            <span
              onClick={() => {
                localStorage.setItem('token', '')
                setToken('')
                setUser({})
                navigate('/')
              }}
              className={'hover:bg-main-orange hover:text-[#ffffff]'}>
              Sign Out
            </span>
          )}
        </div>
      </nav>
      {user.id && (
        <div id="infoContainer">
          <span id="currentUser">Welcome back {user.name}!</span>
        </div>
      )}
    </header>
  )
}

export default NavBar
