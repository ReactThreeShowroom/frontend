import { useNavigate } from 'react-router-dom'
import { getNav } from '../utils/maps'
import { useEffect, useState } from 'react'

// get rid of user after you can fetch user
// const user = { admin: true, activeSub: true, id: 'asdf' }
// const user = { admin: false, activeSub: true, id: 'asdf' }
// const user = { admin: false, activeSub: false, id: 'asdf' }
// const user = { noUser: true }

// put somewhere else?
const nav = [
  { value: 'Home', path: '/', dep: [] },
  { value: 'Showroom', path: '/showroom', dep: ['id'] },
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
    <header id="headContainer" className="flex-col">
      <nav id="navContainer" className="flex justify-around">
        <h1 id="webName" className="font-sans font-semibold text-lg">
          Customize Your Coating
        </h1>
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
      </nav>
      {user && (
        <div id="infoContainer">
          <span id="currentUser">Welcome back {user.name}!</span>
        </div>
      )}
    </header>
  )
}

export default NavBar
