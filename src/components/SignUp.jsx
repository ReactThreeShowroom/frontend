import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GenericLink, FormInputAndLabel } from './index'
import { submitButtonStyles } from '../Styles/formStyles'

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const isMatching =
    formState.confirmPassword.length && formState.password === formState.confirmPassword
  const showMessage = !isMatching && !!formState.confirmPassword.length
  const dispatch = useDispatch()
  const handleSignUp = (e) => {
    e.preventDefault()
    if (isMatching && formState.password.length > 7) {
      // do signup stuff
      // if (success) { navigate('/account')}
      // if (error) { setMessage(error.message) }
      setFormState({ email: '', password: '', confirmPassword: '' }) // temp to test behavior
    }
  }
  const handleFormChange = (e) => {
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
    handler: handleFormChange,
    value: formState.email,
    placeholder: 'email@domain.com',
    message: <p className="text-red text-xs italic">Please choose an email</p>
  }
  const passwordInputProps = {
    id: 'password',
    autoComplete: 'password',
    name: 'password',
    type: 'password',
    handler: handleFormChange,
    value: formState.password,
    placeholder: '******************',
    message:
      formState.password.length === 0 ? (
        <p className="text-black text-xs italic">Please choose a password.</p>
      ) : formState.password.length < 7 ? (
        <p className="text-red-600 text-xs italic">Password must be at least 8 characters!</p>
      ) : (
        <p className="text-black text-xs italic">&nbsp;</p>
      )
  }
  const confirmPasswordInputProps = {
    id: 'confirmPassword',
    autoComplete: 'confirmPassword',
    name: 'confirmPassword',
    type: 'confirmPassword',
    handler: handleFormChange,
    value: formState.confirmPassword,
    placeholder: '******************',
    message: showMessage ? (
      <p className="text-red-600 text-xs italic">Passwords do not match!</p>
    ) : isMatching ? (
      <p className={'text-green-500 text-xs italic'}> Passwords Matching!</p>
    ) : (
      <p className={'text-black text-xs italic'}>Please confirm your password.</p>
    )
  }

  return (
    <form
      className="flex justify-center h-screen w-screen items-center flex-col"
      onSubmit={handleSignUp}>
      <div className="text-grey-darker text-md font-bold mb-2 underline">Sign Up</div>
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <FormInputAndLabel inputProps={emailInputProps} />
        <FormInputAndLabel inputProps={passwordInputProps} />
        <FormInputAndLabel inputProps={confirmPasswordInputProps} />
      </div>
      <div className="flex items-center justify-between flex-col">
        <button className={submitButtonStyles} type="submit" disabled={!isMatching}>
          Sign Up
        </button>
        <GenericLink linkProps={forgotPasswordLinkProps} />
      </div>
    </form>
  )
}

export default SignUp
