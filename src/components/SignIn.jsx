import { Link } from 'react-router-dom'
import { handleNavClick } from '../utils/eventHandlers'
import { useSelector, useDispatch } from 'react-redux'

const SignIn = () => {
  const nav = useSelector((state) => state.nav)
  const dispatch = useDispatch()

  const [link] = nav.filter((navLink) => navLink.path == '/signup')
  const isSelected = link.selected ? 'text-main-orange ' : ''
  const isHidden = !link.active ? 'hidden ' : ''
  const navLinkStyles = `${isSelected}${isHidden}`

  return (
    <>
      <Link
        to={link.path}
        id={`page${link.value}`}
        className={navLinkStyles}
        onClick={() => handleNavClick(dispatch, link)}>
        Sign Up
      </Link>
    </>
  )
}

export default SignIn
