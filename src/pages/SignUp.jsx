import { useState } from 'react'
import { GenericLink, FormInputAndLabel } from './index'
import { submitButtonStyles } from '../Styles/formStyles'
import { handleFormChange, handleFormSubmit } from '../utils/eventHandlers'
import { forgotPasswordLinkProps, inputPropsSignInUp } from '../utils/linkProps'

const SignUp = () => {
  const formInit = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formState, setFormState] = useState(formInit)
  const isMatching =
    formState.confirmPassword.length && formState.password === formState.confirmPassword
  const showMessage = !isMatching && !!formState.confirmPassword.length

  const inputs = [
    [
      'email',
      'email@domain.com',
      <p className="text-red text-xs italic">Please choose an email</p>
    ],
    [
      'password',
      '******************',
      formState.password.length === 0 ? (
        <p className="text-black text-xs italic">Please choose a password.</p>
      ) : formState.password.length < 7 ? (
        <p className="text-red-600 text-xs italic">Password must be at least 8 characters!</p>
      ) : (
        <p className="text-black text-xs italic">&nbsp;</p>
      )
    ],
    [
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
  ].map((atts) => (
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

  return (
    <form
      className="flex justify-center h-screen w-screen items-center flex-col"
      onSubmit={(e) =>
        handleFormSubmit(e, isMatching && formState.password.length > 7, setFormState, formInit)
      }>
      <div className="text-grey-darker text-md font-bold mb-2 underline">Sign Up</div>
      <div className="w-full md:w-1/2 flex flex-col items-center">{inputs}</div>
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
