import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div>
      {/* form goes here for login, option to signup if you don't have a user */}
      <Link to={'/signup'} id={'pageSignupLink'} className={'normalLink'}>
        Sign Up
      </Link>
    </div>
  )
}

export default SignIn
