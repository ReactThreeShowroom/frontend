import { Link } from 'react-router-dom'

export const getNav = (nav, currentPath, user) =>
  nav.reduce((navs, link, i) => {
    if (user.id && (link.path === '/signin' || link.path === '/signup')) return navs
    const { value, path, dep } = link
    const isSelected = currentPath === path ? 'text-main-orange ' : ''
    const hasDeps = dep.every((key) => user[key])
    const hidden = value === 'Home' || hasDeps ? '' : 'hidden '
    const navLinkStyles = `${isSelected}${hidden}hover:bg-main-orange hover:text-[#ffffff]`

    if (value === 'Showroom' && user.subs) {
      let activeSubs = user.subs.filter(
        (sub) => sub.status === 'active' && Date.parse(sub.endDate) >= Date.now()
      ).length
      if (activeSubs && hasDeps) {
        navs.push(
          <Link key={i} id={`nav${value}`} className={navLinkStyles} to={path}>
            {value}
          </Link>
        )
        return navs
      }
    }
    navs.push(
      <Link key={i} id={`nav${value}`} className={navLinkStyles} to={path}>
        {value}
      </Link>
    )
    return navs
  }, [])
// onClick={() => navigate(link)}
// why nav in the Link?
