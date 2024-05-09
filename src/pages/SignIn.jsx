import { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { GenericLink, FormInputAndLabel } from '../components/index'
import { submitButtonStyles } from '../Styles/formStyles'
import { forgotPasswordLinkProps, inputPropsSignInUp } from '../utils/linkProps'
import { handleFormChange } from '../utils/eventHandlers'

const SignIn = () => {
  const initForm = {
    email: '',
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

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('loggin in...')
    // do login stuff
    // if (success) { navigate('/account')}
    // if (error) { setMessage(error.message)}
    setFormState(initForm) //temp to test behavior
  }

  const emailInput = ['email', 'email@domain.com']
  const passwordInput = ['password', '******************']

  const inputs = [emailInput, passwordInput].map((atts) => (
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
