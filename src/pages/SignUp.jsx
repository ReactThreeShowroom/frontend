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
      // console.log('starting signup')
      // console.log('formstate: ', formState)
      const response = await fetch('https://api-3frl.onrender.com/auth?type=register', {
        method: 'POST',
        body: JSON.stringify({
          email: formState.email,
          username: formState.username,
          password: formState.password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      // console.log('response: ', response)
      const status = response.status
      if (status === 201) {
        const { token: _token, message: _message, user: _user } = await response.json()
        if (!_token || !_user)
          throw {
            status: 400,
            message: 'User created, but error getting user.\nPlease try logging in.'
          }
        localStorage.setItem('token', _token)
        setToken(_token)
        setUser(_user)
        navigate('/account')
      } else {
        throw await response.json()
      }
    } catch (error) {
      console.log(error)
      if (error.status !== 201) setMessage(error.message)
      setToken('')
      setUser({ noUser: true })
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
      {!!message.length && message.split('\n').map((msg, index) => <p key={index}>{msg}</p>)}
    </form>
  )
}

export default SignUp
