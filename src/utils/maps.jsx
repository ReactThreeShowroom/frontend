import { Link } from 'react-router-dom'

export const getNav = (nav, handler, dispatch) =>
  nav.map((link, i) => {
    const { value, path, active, selected } = link
    const isSelected = selected ? 'text-main-orange ' : ''
    const isHidden = !active ? 'hidden ' : ''
    const navLinkStyles = `${isSelected}${isHidden} hover:bg-main-orange hover:text-[#ffffff]`
    return (
      <Link
        key={i}
        id={`nav${value}`}
        className={navLinkStyles}
        to={path}
        onClick={() => handler(dispatch, link)}>
        {value}
      </Link>
    )
  })
