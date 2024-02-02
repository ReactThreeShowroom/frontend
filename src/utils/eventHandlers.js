export const handleFormSubmit = (ev, condition, setter, formInit) => {
  ev.preventDefault()
  //do form sub stuff
  if (condition) setter(formInit)
}

export const handleFormChange = (ev, setter, formState) => {
  setter({ ...formState, [ev.target.id]: ev.target.value })
}
