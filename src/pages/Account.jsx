import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Account = () => {
  const {
    state: { user }
  } = useOutletContext()
  const navigate = useNavigate()

  // const [isUser] = useState(user.id)

  console.log(user)

  useEffect(() => {
    let timeoutId
    console.log(user)
    if (user.noUser) {
      timeoutId = setTimeout(() => {
        navigate('/')
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [])

  if (user.noUser)
    return (
      <div>
        <h2>Not logged In!</h2>
        <p>Redirecting in 5 seconds...</p>
      </div>
    )
  return (
    <div>
      <p>Hello {user.name}!</p>
    </div>
  )
}

export default Account
