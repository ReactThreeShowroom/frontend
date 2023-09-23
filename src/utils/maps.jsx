import { Link } from 'react-router-dom'

export const getNav = (nav, handler, dispatch) =>
  nav.map((link, i) => {
    const { value, path, active, selected } = link
    const isSelected = selected ? 'text-main-orange ' : ''
    const isHidden = !active ? 'hidden ' : ''
    const navLinkStyles = `${isSelected}${isHidden}`
    return (
      <Link key={i} className={navLinkStyles} to={path} onClick={() => handler(dispatch, link)}>
        {value}
      </Link>
    )
  })
