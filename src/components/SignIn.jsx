import { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleNavClick } from '../utils/eventHandlers'
import { useSelector, useDispatch } from 'react-redux'

const SignIn = () => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('loggin in...')
    // do login stuff
    // if (success) { navigate('/account')}
    // if (error) { setMessage(error.message)}
    setFormState({ email: '', password: '' }) //temp to test behavior
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  return (
    <form
      className="flex justify-center h-screen w-screen items-center flex-col"
      onSubmit={handleLogin}>
      <p className="text-grey-darker text-md font-bold mb-2 underline">Log In</p>
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow-sm border-2 rounded-md w-full py-2 px-3 text-grey-darker mb-3"
            id="email"
            name="email"
            autoComplete="email"
            type="email"
            onChange={handleChange}
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
            autoComplete="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={formState.password}
            placeholder="******************"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between">
        <button
          className="bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 border-main-orange w-full p-2 my-2 rounded-md text-center"
          type="submit">
          Log In
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

export default SignIn
