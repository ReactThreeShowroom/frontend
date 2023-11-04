import { useSelector } from 'react-redux'
import { LoggedOutHome, LoggedInHome } from './index'
const Home = () => {
  const user = useSelector((state) => state.user)

  return (
    <section>
      <h2>Welcome to Customize Your Coatings!</h2>
      {user.id ? <LoggedInHome user={user} /> : <LoggedOutHome />}
    </section>
  )
}

export default Home
