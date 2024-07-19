import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import SubEntry from '../components/SubEntry'
import RequestNewSubForm from '../components/RequestNewSubForm'

const Account = () => {
  const {
    state: { user, token },
    setters: { setUser, setToken }
  } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    let timeoutId
    if (!user.id) {
      timeoutId = setTimeout(() => {
        navigate('/')
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [])

  if (!user.id)
    return (
      <div>
        <h2>Not logged In!</h2>
        <p>Redirecting in 5 seconds...</p>
      </div>
    )
  const condition = (sub, status) =>
    status === 'pending' ? sub.status === 'pending' : sub.status !== 'pending'

  const createList = (user, status) => {
    return user.subs
      .filter((sub) => condition(sub, status))
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
      .map((sub, i) => <SubEntry sub={sub} key={sub.id} />)
  }

  const displayList = (list) => (!!list.length ? list : 'No History')

  const pageContainer = 'flex flex-col w-full'
  const mainContainer = 'flex flex-col'
  const listContainer = 'flex flex-col justify-center items-center md:flex-row md:justify-around'
  const listSection = 'w-full flex flex-col items-center'
  const listHeader = 'font-bold'

  return (
    <div className={pageContainer}>
      <p>Hello {user.name}!</p>
      <div className={mainContainer}>
        <RequestNewSubForm />
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
      </div>
    </div>
  )
}

export default Account
