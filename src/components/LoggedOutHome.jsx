import { Link } from 'react-router-dom'

const LoggedOutHome = () => {
  return (
    <article>
      <section className={'flex flex-col text-center'}>
        <p>
          <Link className={'text-main-orange'} to={'/signin'}>
            Log in
          </Link>{' '}
          or{' '}
          <Link className={'text-main-orange'} to={'/signup'}>
            sign up
          </Link>{' '}
          to access the Cerakote® Showroom!
        </p>
        <p>
          Are you a registered Applicator's client?{' '}
          <Link className={'text-main-orange'} to={'/showroom'}>
            click here
          </Link>{' '}
          to access your saved color choices!
        </p>
      </section>
    </article>
  )
}

export default LoggedOutHome
