import SignOut from './SignOut'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const NavBar = () => {
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const client = useSelector((state) => state.client)
  /**
   * show admin, account, signin, signout for now
   * conditionally show links on login, isAdmin, token status later
   * conditionally show the client if exists
   * conditionally show user if exists
   */
  return (
    <div id="headContainer">
      <nav id="navContainer">
        <Link id="navHome" className="navLink" to="/home">
          Home
        </Link>
        <Link id="navShowroom" className="navLink" to="/showroom">
          Showroom
        </Link>
        {user.isAdmin && (
          <Link id="navAdmin" className="navLink" to="/admin">
            Admin
          </Link>
        )}
        {auth.token && (
          <Link id="navAccount" className="navLink" to="/account">
            Account
          </Link>
        )}
        {!auth.token && (
          <Link id="navSignup" className="navLink" to="/signup">
            Sign Up
          </Link>
        )}
        {!auth.token && (
          <Link id="navSignup" className="navLink" to="/signin">
            Sign In
          </Link>
        )}
        {auth.token && <SignOut id="navSignout" className="navLink" />}
      </nav>
      {auth.token && (
        <div id="infoContainer">
          <span id="currentUser">Welcome back {user.name}!</span>
          {client.id && <span id="currentClient"> Currently working with: {client.name}</span>}
        </div>
      )}
    </div>
  )
}

export default NavBar
