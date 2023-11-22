import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleNavClick } from '../utils/eventHandlers'
import { useDispatch } from 'react-redux'

const PasswordReset = () => {
  const dispatch = useDispatch()

  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // do something with email here
    setEmail('')
  }
  return (
    <div className="flex flex-col justify-center h-screen w-screen items-center ">
      <p className="text-grey-darker text-md font-bold mb-2 underline">Reset Password</p>
      {submitted ? (
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="flex flex-col items-centermb-4 w-7/12">
            <p className="block text-grey-darker text-sm font-bold mb-2">
              An email will be sent to the email address submitted if we have it on file with
              further instructions. Thank you.
            </p>
            <Link
              className="bg-transparent border-2 border-main-orange hover:bg-main-orange hover:text-white w-full p-2 my-2 rounded-md text-center"
              id="passResetSignIn"
              to="/signin"
              onClick={(e) => {
                handleNavClick(dispatch, '/signin')
              }}>
              Back to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form className="w-full md:w-1/2 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
              Please enter your email address.
            </label>
            <input
              className="shadow-sm border-2 rounded-sm w-full py-2 px-3 text-grey-darker mb-3"
              id="email"
              name="email"
              autoComplete="email"
              type="text"
              placeholder="email@domain.com"
              onChange={handleChange}
              value={email}
            />
            <div className="flex flex-col items-center justify-between">
              <button
                id="passResetSubmit"
                className="bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 border-main-orange w-full p-2 my-2 rounded-md text-center"
                type="submit">
                Submit
              </button>
              <Link
                className="bg-transparent hover:text-main-orange w-full p-2 my-2 rounded-md text-center"
                id="passResetSignIn"
                to="/signin"
                onClick={(e) => {
                  handleNavClick(dispatch, '/signin')
                }}>
                Back to Sign In
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default PasswordReset
