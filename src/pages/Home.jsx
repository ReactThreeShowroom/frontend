import { LoggedOutHome, LoggedInHome } from '../components'
import { useOutletContext } from 'react-router-dom'
const Home = () => {
  const {
    state: { user, token }
  } = useOutletContext()
  return (
    <section>
      <h2>Welcome to Customize Your Coatings!</h2>
      {user.id ? (
        <LoggedInHome user={user} token={token} />
      ) : (
        <LoggedOutHome user={user} token={token} />
      )}
    </section>
  )
}

export default Home
