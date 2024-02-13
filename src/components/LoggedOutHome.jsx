import { Link } from 'react-router-dom'

const LoggedOutHome = () => {
  return (
    <article>
      <p>Log in or sign up to access the Cerakote® Showroom!</p>
      <p>
        Are you a registered Applicator's client?
        <Link to={'/showroom'} onClick={() => {}}>
          click here
        </Link>
        to access your saved color choices!
      </p>
    </article>
  )
}

export default LoggedOutHome
