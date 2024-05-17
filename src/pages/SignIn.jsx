import { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { GenericLink, FormInputAndLabel } from '../components/index'
import { submitButtonStyles } from '../Styles/formStyles'
import { forgotPasswordLinkProps, inputPropsSignInUp } from '../utils/linkProps'
import { handleFormChange } from '../utils/eventHandlers'

const SignIn = () => {
  const initForm = {
    username: '',
    password: ''
  }
  const [formState, setFormState] = useState(initForm)
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

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in...')
    try {
      const response = await fetch('https://api-3frl.onrender.com/auth?type=login', {
        method: 'POST',
        body: JSON.stringify({
          username: formState.username,
          password: formState.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status == 200) {
        const { token: _token, user: _user } = await response.json()
        localStorage.setItem('token', _token)
        setToken(_token)
        setUser(_user)
        navigate('/account')
      }
    } catch (error) {
      console.log('error: ', error)
      console.error('login failed, please try again.')
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
  const btnContClass = 'flex flex-col items-center justify-between'

  return (
    <form className={formClass} onSubmit={handleLogin}>
      <p className={textClass}>Log In</p>
      <div className={inputClass}>{inputs}</div>
      <div className={btnContClass}>
        <button className={submitButtonStyles} type="submit">
          Log In
        </button>
        <GenericLink linkProps={forgotPasswordLinkProps} />
      </div>
    </form>
  )
}

export default SignIn
