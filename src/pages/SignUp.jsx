import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { GenericLink, FormInputAndLabel } from '../components'
import { submitButtonStyles } from '../Styles/formStyles'
import { handleFormChange, handleFormSubmit } from '../utils/eventHandlers'
import { forgotPasswordLinkProps, inputPropsSignInUp } from '../utils/linkProps'

const SignUp = () => {
  const formInit = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
  const [formState, setFormState] = useState(formInit)
  const [message, setMessage] = useState('')
  const {
    state: { token, user },
    setters: { setToken, setUser }
  } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (token || !user.noUser) {
      setUser({ noUser: true })
      setToken('')
      navigate('/')
    }
  }, [token, user])

  const isMatching =
    formState.confirmPassword.length && formState.password === formState.confirmPassword
  const showMessage = !isMatching && !!formState.confirmPassword.length

  const emailInput = [
    'email',
    'email@domain.com',
    <p className="text-red text-xs italic">Please choose an email</p>
  ]
  const usernameInput = [
    'username',
    'sampleUsername',
    <p className="text-red text-xs italic">Please supply a username for login</p>
  ]
  const passwordInput = [
    'password',
    '******************',
    formState.password.length === 0 ? (
      <p className="text-black text-xs italic">Please choose a password.</p>
    ) : formState.password.length < 7 ? (
      <p className="text-red-600 text-xs italic">Password must be at least 8 characters!</p>
    ) : (
      <p className="text-black text-xs italic">&nbsp;</p>
    )
  ]
  const confirmPassInput = [
    'confirmPassword',
    '******************',
    showMessage ? (
      <p className="text-red-600 text-xs italic">Passwords do not match!</p>
    ) : isMatching ? (
      <p className={'text-green-500 text-xs italic'}> Passwords Matching!</p>
    ) : (
      <p className={'text-black text-xs italic'}>Please confirm your password.</p>
    )
  ]

  const inputs = [emailInput, usernameInput, passwordInput, confirmPassInput].map((atts) => (
    <FormInputAndLabel
      key={atts[0]}
      inputProps={inputPropsSignInUp(
        atts[0],
        handleFormChange,
        [formState, setFormState],
        atts[1],
        atts[2]
      )}
    />
  ))

  const formClass = 'flex justify-center h-screen w-screen items-center flex-col'
  const textClass = 'text-grey-darker text-md font-bold mb-2 underline'
  const inputContClass = 'w-full md:w-1/2 flex flex-col items-center'
  const btnContClass = 'flex items-center justify-between flex-col'

  const handleSignUp = async (e) => {
    try {
      e.preventDefault()
      const condition = isMatching && formState.password.length > 7
      if (!condition) {
        setMessage('Passwords must match and be at least 8 characters long')
        return
      }

      const response = await fetch('', {})
      const status = response.status
      if (status === 200) {
        const { token: _token, message: _message, user: _user } = response.json()
        localStorage.setItem('token', _token)
        setToken(_token)
        setUser(_user)
        navigate('/account')
      } else {
        setMessage('Something went wrong trying to Sign up.\nPlease try again.')
      }
    } catch (error) {
      setMessage('Something went wrong trying to Sign up.\nPlease try again.')
    }
  }
  return (
    <form className={formClass} onSubmit={handleSignUp}>
      <p className={textClass}>Sign Up</p>
      <div className={inputContClass}>{inputs}</div>
      <div className={btnContClass}>
        <button className={submitButtonStyles} type="submit" disabled={!isMatching}>
          Sign Up
        </button>
        <GenericLink linkProps={forgotPasswordLinkProps} />
      </div>
      {!!message.length && message.split('\n').map((msg) => <p>{msg}</p>)}
    </form>
  )
}

export default SignUp
