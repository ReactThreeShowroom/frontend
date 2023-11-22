import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const isMatching = formState.confirmPassword
    ? formState.password === formState.confirmPassword
    : false
  const showMessage = !isMatching && !!formState.confirmPassword.length

  const dispatch = useDispatch()
  const handleSignUp = (e) => {
    e.preventDefault()
    if (isMatching) {
      // do signup stuff
      // if (success) { navigate('/account')}
      // if (error) { setMessage(error.message) }
      setFormState({ email: '', password: '', confirmPassword: '' }) // temp to test behavior
    }
  }
  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  return (
    <form
      className="flex justify-center h-screen w-screen items-center flex-col"
      onSubmit={handleSignUp}>
      <div className="text-grey-darker text-md font-bold mb-2 underline">Sign Up</div>
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow-sm border-2 rounded-md w-full py-2 px-3 text-grey-darker mb-3"
            id="email"
            name="email"
            type="email"
            onChange={handleFormChange}
            value={formState.email}
            placeholder="email@domain.com"
          />
        </div>
        <div className="mb-3">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow-sm border-2 rounded-md w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            onChange={handleFormChange}
            value={formState.password}
            placeholder="******************"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handleFormChange}
            value={formState.confirmPassword}
            placeholder="******************"
          />
          <p className={`text-black text-xs italic ${!showMessage && 'mb-4'}`}>
            Please confirm your password.
          </p>
          {showMessage && <p className={`text-red-600 text-xs italic`}>Passwords do not match!</p>}
        </div>
      </div>
      <div className="flex items-center justify-between flex-col">
        <button
          className="bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 border-main-orange w-full p-2 my-2 rounded-md text-center"
          type="submit"
          disabled={!isMatching}>
          Sign Up
        </button>
        <Link
          to="/passwordReset"
          id="signInResetLink"
          className="bg-transparent hover:text-main-orange w-full p-2 my-2 rounded-md text-center"
          onClick={() => handleNavClick(dispatch, '/passwordReset')}>
          Forgot Password?
        </Link>
      </div>
    </form>
  )
}

export default SignUp
