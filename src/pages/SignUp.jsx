import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { GenericLink, FormInputAndLabel } from '../components'
import { submitButtonStyles } from '../Styles/formStyles'
import { handleFormChange } from '../utils/eventHandlers'
import { forgotPasswordLinkProps, inputPropsSignInUp } from '../utils/linkProps'
import { createUser } from '../utils/fetches'

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
    if (token || user.id) {
      navigate('/')
    }
  }, [token, user])

  const isMatching =
    formState.confirmPassword.length && formState.password === formState.confirmPassword
  const showMessage = !isMatching && !!formState.confirmPassword.length

  const errorText = 'text-red-600 text-xs italic'
  const normalText = 'text-black text-xs italic'
  const confirmText = 'text-green-500 text-xs italic'

  const emailInput = [
    'email',
    'email@domain.com',
    <p className={errorText}>Please choose an email</p>
  ]
  const usernameInput = [
    'username',
    'sampleUsername',
    <p className={errorText}>Please supply a username for login</p>
  ]
  const passwordInput = [
    'password',
    '******************',
    formState.password.length === 0 ? (
      <p className={normalText}>Please choose a password.</p>
    ) : formState.password.length < 7 ? (
      <p className={errorText}>Password must be at least 8 characters!</p>
    ) : (
      <p className={normalText}>&nbsp;</p>
    )
  ]
  const confirmPassInput = [
    'confirmPassword',
    '******************',
    showMessage ? (
      <p className={errorText}>Passwords do not match!</p>
    ) : isMatching ? (
      <p className={confirmText}> Passwords Matching!</p>
    ) : (
      <p className={normalText}>Please confirm your password.</p>
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
  const btnContClass = 'flex items-center justify-between flex-col w-36'

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
      const res = await createUser(formState)
      if(res.status === 400) throw new Error('username already exists')

      if (res.status === 500) throw new Error('Server error, please try again later')
        
      const { token: _token, user: _user } = res
      // if (res.message) throw res
      localStorage.setItem('token', _token)
      setToken(_token)
      setUser(_user)
      navigate('/account')
    } catch (error) {
      console.log(error)
      if (error.status !== 201) setMessage(error.message)
      setToken('')
      setUser({})
    }
  }
  return (
    <form className={formClass} onSubmit={handleSignUp}>
      <p className={textClass}>Sign Up</p>
      <div className={inputContClass}>{inputs}</div>
      <div className='h-6 text-red-500'>
        {!!message.length && message.split('\n').map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
      <div className={btnContClass}>
        <button className={submitButtonStyles} type="submit" disabled={!isMatching}>
          Sign Up
        </button>
        <GenericLink linkProps={forgotPasswordLinkProps} />
      </div>
    </form>
  )
}

export default SignUp
