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

  const subsList = user.subs.length ? (
    user.subs.map((sub, i) => <SubEntry sub={sub} key={sub.id} />)
  ) : (
    <h2>No Subscriptions</h2>
  )

  return (
    <div>
      <p>Hello {user.name}!</p>
      <div>
        <RequestNewSubForm />
        <section>{subsList}</section>
      </div>
    </div>
  )
}

export default Account
