import { useState } from 'react'
import { GenericLink, FormInputAndLabel } from './index'
import { submitButtonStyles } from '../Styles/formStyles'

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

  const forgotPasswordLinkProps = {
    pathName: '/forgotPassword',
    linkId: 'signInResetLink',
    dispatch,
    linkText: 'Forgot Password?'
  }

  const emailInputProps = {
    id: 'email',
    name: 'email',
    autoComplete: 'email',
    type: 'email',
    handler: handleChange,
    value: formState.email,
    placeholder: 'email@domain.com'
  }
  const passwordInputProps = {
    id: 'password',
    autoComplete: 'password',
    name: 'password',
    type: 'password',
    handler: handleChange,
    value: formState.password,
    placeholder: '******************'
  }

  return (
    <form
      className="flex justify-center h-screen w-screen items-center flex-col"
      onSubmit={handleLogin}>
      <p className="text-grey-darker text-md font-bold mb-2 underline">Log In</p>
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <FormInputAndLabel inputProps={emailInputProps} />
        <FormInputAndLabel inputProps={passwordInputProps} />
      </div>
      <div className="flex flex-col items-center justify-between">
        <button className={submitButtonStyles} type="submit">
          Log In
        </button>
        <GenericLink linkProps={forgotPasswordLinkProps} />
      </div>
    </form>
  )
}

export default SignIn
