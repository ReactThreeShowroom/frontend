import { useNavigate } from 'react-router-dom'
import { getNav } from '../utils/maps'

// get rid of user after you can fetch user
const user = { admin: true, activeSub: true, id: 'asdf' }
// const user = { admin: false, activeSub: true, id: 'asdf' }
// const user = { admin: false, activeSub: false, id: 'asdf' }
// const user = { noUser: true }

// put somewhere else?
const nav = [
  { value: 'Home', path: '/', dep: [] },
  { value: 'Showroom', path: '/showroom', dep: ['id', 'activeSub'] },
  { value: 'Admin', path: '/admin', dep: ['id', 'admin'] },
  { value: 'Account', path: '/account', dep: ['id'] },
  { value: 'Sign Up', path: '/signup', dep: ['noUser'] },
  { value: 'Sign In', path: '/signin', dep: ['noUser'] }
]

const NavBar = ({ navState }) => {
  const navigate = useNavigate()
  const [pathname, search, hash] = navState.location
  const linksMap = getNav(nav, pathname, user)

  return (
    <header id="headContainer" className="flex-col">
      <nav id="navContainer" className="flex justify-around">
        <h1 id="webName" className="font-sans font-semibold text-lg">
          Customize Your Coatings
        </h1>
        {linksMap}
        {!user.noUser && (
          <span
            onClick={() => {
              // setAuth
              navigate('/')
            }}
            className={'hover:bg-main-orange hover:text-[#ffffff]'}>
            Sign Out
          </span>
        )}
      </nav>
      {user && (
        <div id="infoContainer">
          <span id="currentUser">Welcome back {/*user.name*/}!</span>
          {<span id="currentClient">&nbsp;Currently working with: {/*client.name*/}</span>}
        </div>
      )}
    </header>
  )
}

export default NavBar
