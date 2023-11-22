import { handleNavClick } from '../utils/eventHandlers'
import { Link } from 'react-router-dom'

const GenericLink = ({ linkProps: { pathName, linkId, dispatch, linkText } }) => {
  const linkStyles = 'bg-transparent hover:text-main-orange w-full p-2 my-2 rounded-md text-center'
  const handleClick = () => handleNavClick(dispatch, pathName)
  return (
    <Link to={pathName} id={linkId} className={linkStyles} onClick={handleClick}>
      {linkText}
    </Link>
  )
}

export default GenericLink
