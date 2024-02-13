import { Link } from 'react-router-dom'
import { genericLinkStyles } from '../Styles/linkStyles'
import { useNavigateClick } from '../utils/hooks'

const GenericLink = ({ linkProps: { pathName, linkId, linkText } }) => {
  const handleClick = useNavigateClick()

  return (
    <Link to={pathName} id={linkId} className={genericLinkStyles} onClick={handleClick}>
      {linkText}
    </Link>
  )
}

export default GenericLink
