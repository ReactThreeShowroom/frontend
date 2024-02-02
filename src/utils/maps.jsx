import { Link } from 'react-router-dom'

export const getNav = (nav, currentPath, user) =>
  nav.map((link, i) => {
    const { value, path } = link
    const isSelected = currentPath === path ? 'text-main-orange ' : ''
    const hasDeps = link.dep.every((key) => user[key])
    const hidden = value === 'Home' || hasDeps ? '' : 'hidden '
    const navLinkStyles = `${isSelected}${hidden}hover:bg-main-orange hover:text-[#ffffff]`
    return (
      <Link
        key={i}
        id={`nav${value}`}
        className={navLinkStyles}
        to={path}
        onClick={() => {
          navigate(link)
        }}>
        {value}
      </Link>
    )
  })
