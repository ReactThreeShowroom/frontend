import { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { GenericLink, FormInputAndLabel } from '../components/index'
import { submitButtonStyles } from '../Styles/formStyles'
import { forgotPasswordLinkProps, inputPropsSignInUp } from '../utils/linkProps'
import { handleFormChange } from '../utils/eventHandlers'
import { loginUser } from '../utils/fetches'

const SignIn = () => {
  const initForm = {
    username: '',
    password: ''
  }
  const [formState, setFormState] = useState(initForm)
  const [error, setError] = useState('')

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

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in...')
    try {
      const {status, token: _token, user: _user } = await loginUser(formState)

      if(status === 400) throw new Error('Invalid username or password')

      if (status === 500) throw new Error('Server error, please try again later')

      if (_token && _user) {
        localStorage.setItem('token', _token)
        setToken(_token)
        setUser(_user)
        navigate('/')
      }
    } catch (error) {
      // console.log('error: ', error)
      console.error('login failed, please try again.')
      setError(error.message)
      setTimeout(() => setError(""), 5000);
    }
  }

  const usernameInput = ['username', 'usernameexample']
  const passwordInput = ['password', '******************']

  const inputs = [usernameInput, passwordInput].map((atts) => (
    <FormInputAndLabel
      key={atts[0]}
      inputProps={inputPropsSignInUp(atts[0], handleFormChange, [formState, setFormState], atts[1])}
    />
  ))

  const formClass = 'flex justify-center h-screen w-screen items-center flex-col'
  const textClass = 'text-grey-darker text-md font-bold mb-2 underline'
  const inputClass = 'w-full md:w-1/2 flex flex-col items-center '
  const btnContClass = 'flex flex-col items-center justify-between w-36'

  return (
    <form className={formClass} onSubmit={handleLogin}>
      <p className={textClass}>Log In</p>
      <div className={inputClass}>{inputs}</div>
      <div className={btnContClass}>
        <button className={submitButtonStyles} type="submit">
          Log In
        </button>
        <div className='h-6 w-56 text-red-500'>{error}</div>
        <GenericLink linkProps={forgotPasswordLinkProps} />
      </div>
    </form>
  )
}

export default SignIn
