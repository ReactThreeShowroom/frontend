import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Admin = () => {
  const {
    state: { user }
  } = useOutletContext()
  const navigate = useNavigate()
  const [isAdmin] = useState(user.admin)

  useEffect(() => {
    let timeoutId
    if (!isAdmin) {
      timeoutId = setTimeout(() => {
        navigate('/')
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [])

  if (!isAdmin)
    return (
      <div>
        <h2>Not an Admin!</h2>
        <p>Redirecting in 5 seconds...</p>
      </div>
    )
  return (
    <div>
      <p>Hello from Admin</p>
    </div>
  )
}

export default Admin
