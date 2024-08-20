import { useState } from 'react'
import { useLoaderData } from 'react-router'
import SubEntryAdmin from './SubEntryAdmin'

const SingleUserAdmin = () => {
  let user = useLoaderData()
  let subs = user.subs ? user.subs : []
  const [showSubs, setShowSubs] = useState(false)

  const condition = (sub, status) =>
    status === 'pending' ? sub.status === 'pending' : sub.status !== 'pending'

  const createList = (user, status) => {
    return user.subs
      .filter((sub) => condition(sub, status))
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
      .map((sub, i) => <SubEntryAdmin sub={sub} key={sub.id} />)
  }

  const displayList = (list) => (!!list.length ? list : 'No History')

  const listContainer = 'flex flex-col justify-center items-center md:flex-row md:justify-around'
  const listSection = 'w-full flex flex-col items-center'
  const listHeader = 'font-bold'
  const buttonStyle =
    'w-full p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'

  return user ? (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Admin: {`${user.admin}`}</p>
      <p>Active: {`${user.active}`}</p>
      <button type="button" className={buttonStyle} onClick={() => setShowSubs(!showSubs)}>
        {!showSubs ? 'Show Subs' : 'Hide Subs'}
      </button>
      {showSubs && !!subs.length && (
        <div className={listContainer}>
          <section className={listSection}>
            <h2 className={listHeader}>Pending Subscriptions</h2>
            {displayList(createList(user, 'pending'))}
          </section>
          <section className={listSection}>
            <h2 className={listHeader}>Subscription History</h2>
            {displayList(createList(user, 'active'))}
          </section>
        </div>
      )}
    </div>
  ) : (
    <div>No User</div>
  )
}

export default SingleUserAdmin
