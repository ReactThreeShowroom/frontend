import { useState } from 'react'
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

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('loggin in...')
    // do login stuff
    // if (success) { navigate('/account')}
    // if (error) { setMessage(error.message)}
    setFormState(initForm) //temp to test behavior
  }

  const inputs = [
    ['email', 'email@domain.com'],
    ['password', '******************']
  ].map((atts) => (
    <FormInputAndLabel
      key={atts[0]}
      inputProps={inputPropsSignInUp(atts[0], handleFormChange, [formState, setFormState], atts[1])}
    />
  ))

  return (
    <form
      className="flex justify-center h-screen w-screen items-center flex-col"
      onSubmit={handleLogin}>
      <p className="text-grey-darker text-md font-bold mb-2 underline">Log In</p>
      <div className="w-full md:w-1/2 flex flex-col items-center ">{inputs}</div>
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
