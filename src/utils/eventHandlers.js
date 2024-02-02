export const handleFormSubmit = (ev, setter, formInit) => {
  ev.preventDefault()
  //do form sub stuff
  setter(formInit)
}

export const handleFormChange = (ev, setter, formState) => {
  setter({ ...formState, [ev.target.id]: ev.target.value })
}
