export const forgotPasswordLinkProps = {
  pathName: '/forgotPassword',
  linkId: 'signInResetLink',
  linkText: 'Forgot Password?'
}

export const inputPropsSignInUp = (
  label,
  handler,
  state,
  placeholder,
  message,
  required = true
) => {
  return {
    id: label,
    name: label,
    autocomplete: label === 'confirmPassword' ? 'password' : label,
    type: label === 'confirmPassword' ? 'password' : label,
    handler,
    form: state,
    value: state[label],
    placeholder,
    message,
    required
  }
}

export const inputTextNoAutoComplete = (
  label,
  handler,
  state,
  placeholder,
  message,
  stateKey,
  required = false
) => {
  return {
    id: label,
    name: label,
    type: 'text',
    handler,
    form: state,
    value: state[stateKey],
    placeholder,
    message,
    required
  }
}

export const inputEmailNoAutoComplete = (
  label,
  handler,
  state,
  placeholder,
  message,
  required = false
) => {
  return {
    id: label,
    name: label,
    type: 'email',
    handler,
    form: state,
    value: state['email'],
    placeholder,
    message,
    required
  }
}

export const inputTelNoAutoComplete = (
  label,
  handler,
  state,
  placeholder,
  message,
  required = false
) => {
  return {
    id: label,
    name: label,
    type: 'tel',
    handler,
    form: state,
    value: state['phone'],
    placeholder,
    message,
    required
  }
}
