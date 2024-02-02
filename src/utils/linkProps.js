export const forgotPasswordLinkProps = {
  pathName: '/forgotPassword',
  linkId: 'signInResetLink',
  linkText: 'Forgot Password?'
}

export const inputPropsSignInUp = (label, handler, state, placeholder, message) => {
  return {
    id: label,
    name: label,
    autocomplete: label,
    type: label,
    handler,
    form: state,
    value: state[label],
    placeholder,
    message
  }
}
