import { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { getAllUsersAdmin } from '../utils/fetches'
import AdminSearchForm from '../components/AdminSearchForm'

const Admin = () => {
  const {
    state: { user, token }
  } = useOutletContext()
  const navigate = useNavigate()
  const { pendingSubs } = useLoaderData()
  const [userSearch, setUserSearch] = useState({ term: '', type: 'name', input: '' })
  const [listUsers, setListUsers] = useState(false)
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState(
    users.filter((_user) => _user[userSearch.type].includes(userSearch.term))
  )
  const [pagination, setPagination] = useState({ skip: 0, take: 0 })

  useEffect(() => {
    let timeoutId
    if (!user.admin) {
      timeoutId = setTimeout(() => {
        navigate('/')
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (user.admin && listUsers) {
      const { skip, take } = pagination
      getAllUsersAdmin({ setter: setUsers, token, skip, take })
    }
  }, [listUsers])

  if (!user.admin)
    return (
      <div>
        <h2>Not an Admin!</h2>
        <p>Redirecting in 5 seconds...</p>
      </div>
    )

  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'
  const pageContainer = 'flex flex-col w-full'
  const mainContainer = 'flex flex-col'
  const subListContainer = 'flex flex-col justify-center items-center md:flex-row md:justify-around'
  const userListContainer = 'flex flex-col justify-center items-center'
  const subListSection = 'w-full flex flex-col items-center'
  const subListHeader = 'font-bold'

  const handleShowList = () => setListUsers(!listUsers)
  const buttonProps = { type: 'button', className: buttonStyle, onClick: handleShowList }

  const listUsersCB = (_user) => (
    <Link key={_user.id.slice(0, 7)} to={`/admin/user/${_user.id}`}>
      {_user.name}
    </Link>
  )
  const createFilteredUsers = () =>
    !!filteredUsers.length ? filteredUsers.map(listUsersCB) : 'No Filtered Results'
  const displayUsers = () =>
    !userSearch.term.length ? users.map(listUsersCB) : createFilteredUsers()

  const formState = { userSearch, setUserSearch, users, setFilteredUsers }

  const createPendingAdminSubList = (pendingSubs) =>
    pendingSubs.map((sub) => (
      <Link
        to={`./sub/${sub.id}`}
        key={sub.id.slice(0, 7)}
        className="w-full self-start text-center">
        Hello! Sub {sub.id.slice(0, 7)}
      </Link>
    ))

  const displayPendingSubList = (list) => (!!list.length ? list : 'No Pending Subs')

  return (
    <div className={pageContainer}>
      <p>Hello {user.name}!</p>
      <div className={mainContainer}>
        {/* Users */}
        <div className={userListContainer}>
          <h2 className={subListHeader}>Selected User</h2>
          {listUsers && <Outlet />}
          <button {...buttonProps}>{listUsers ? 'Hide Users' : 'See Users'}</button>
          {listUsers && <AdminSearchForm formState={formState} />}
          {/* Users List */}
          <section className={subListSection}>
            <h2 className={subListHeader}>Users</h2>
            {listUsers && displayUsers()}
          </section>
        </div>
        {/* Pending Subs */}
        <div className={subListContainer}>
          {!listUsers && <Outlet />}
          <section className={subListSection}>
            <h2 className={subListHeader}>Pending Subscriptions</h2>
            {displayPendingSubList(createPendingAdminSubList(pendingSubs))}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Admin
