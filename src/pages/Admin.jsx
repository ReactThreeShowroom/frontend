import { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { getAllUsersAdmin } from '../utils/fetches'

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
      getAllUsersAdmin({ setter: setUsers, token, skip: pagination.skip, take: pagination.take })
    }
  }, [listUsers])

  if (!user.admin)
    return (
      <div>
        <h2>Not an Admin!</h2>
        <p>Redirecting in 5 seconds...</p>
      </div>
    )

  const createList = (pendingSubs) => {
    return pendingSubs.map((sub) => {
      return (
        <div className="w-full self-start" key={sub.id.slice(0, 7)}>
          <Link to={`./sub/${sub.id}`} className="text-center">
            Hello! Sub {sub.id.slice(0, 7)}
          </Link>
        </div>
      )
    })
  }

  const displayList = (list) => (!!list.length ? list : 'No Pending Subs')

  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'
  const pageContainer = 'flex flex-col w-full'
  const mainContainer = 'flex flex-col'
  const subListContainer = 'flex flex-col justify-center items-center md:flex-row md:justify-around'
  const subListSection = 'w-full flex flex-col items-center'
  const subListHeader = 'font-bold'

  const handleShowList = () => setListUsers(!listUsers)

  const handleRadioChange = async (e) => setUserSearch({ ...userSearch, type: e.target.value })

  const handleInputChange = async (e) => setUserSearch({ ...userSearch, input: e.target.value })

  const handleFormSubmit = async (e) => (
    e.preventDefault(),
    setUserSearch({ ...userSearch, term: userSearch.input }),
    setFilteredUsers(
      users.filter((_user) =>
        _user[userSearch.type].toLowerCase().includes(userSearch.input.toLowerCase())
      )
    )
  )
  const radioButtonProps = (type, label) => ({
    type: 'radio',
    id: label,
    name: label,
    value: label,
    checked: type === label,
    className: 'mx-1'
  })
  const searchTypes = {
    name: radioButtonProps(userSearch.type, 'name'),
    email: radioButtonProps(userSearch.type, 'email'),
    phone: radioButtonProps(userSearch.type, 'phone')
  }
  const createLabelName = (label) => `${label[0].toUpperCase()}${label.slice(1)}`
  const radioListCB = (key) => (
    <div key={key}>
      <label htmlFor={key} className="mx-1">
        {createLabelName(key)}
      </label>
      <input {...searchTypes[key]} onChange={handleRadioChange} />
    </div>
  )
  const radioList = Object.keys(searchTypes).map(radioListCB)
  const listUsersCB = (_user) => (
    <Link key={_user.id.slice(0, 7)} to={`/admin/user/${_user.id}`}>
      {_user.name}
    </Link>
  )
  const createFilteredMap = () =>
    !!filteredUsers.length ? filteredUsers.map(listUsersCB) : 'No Filtered Results'
  const createUserMap = () =>
    !userSearch.term.length ? users.map(listUsersCB) : createFilteredMap()

  return (
    <div className={pageContainer}>
      <p>Hello {user.name}!</p>
      <div className={mainContainer}>
        <div className={subListContainer}>
          <h2 className={subListHeader}>Selected User</h2>
          <Outlet />
          <button type="button" className={buttonStyle} onClick={handleShowList}>
            {listUsers ? 'Hide Users' : 'See Users'}
          </button>
          {listUsers && (
            <form className={'w-full flex flex-col items-center'} onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="input"
                id="input"
                value={userSearch.input}
                onChange={handleInputChange}
                className={'border-main-orange rounded-md border-2'}
              />
              <fieldset className={'flex flex-row w-1/2 mx-4 justify-between'}>
                {radioList}
              </fieldset>
              <button
                type="submit"
                className={
                  'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'
                }>
                Search
              </button>
            </form>
          )}
          <h2 className={subListHeader}>Users</h2>
          <div className={subListContainer}>{listUsers && createUserMap()}</div>
          <section className={subListSection}>
            <h2 className={subListHeader}>Pending Subscriptions</h2>
            {displayList(createList(pendingSubs))}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Admin
