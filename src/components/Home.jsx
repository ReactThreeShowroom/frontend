import { LoggedOutHome, LoggedInHome } from './index'
import { useOutletContext } from 'react-router-dom'
const Home = () => {
  const {
    state: { user }
  } = useOutletContext()
  return (
    <section>
      <h2>Welcome to Customize Your Coatings!</h2>
      {user.id ? <LoggedInHome user={user} /> : <LoggedOutHome />}
    </section>
  )
}

export default Home
