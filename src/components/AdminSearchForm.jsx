const AdminSearchForm = ({ formState }) => {
  const { userSearch, setUserSearch, users, setFilteredUsers } = formState

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const { type, input } = userSearch
    const term = userSearch.input.toLowerCase()
    const filterUsers = (_user) => _user[type].toLowerCase().includes(term)
    setUserSearch({ ...userSearch, term: input })
    setFilteredUsers(users.filter(filterUsers))
  }

  const handleInputChange = async (e) => setUserSearch({ ...userSearch, input: e.target.value })

  const handleRadioChange = async (e) => setUserSearch({ ...userSearch, type: e.target.value })

  const radioButtonProps = (type, label) => ({
    type: 'radio',
    id: label,
    name: label,
    value: label,
    checked: type === label,
    className: 'mx-1'
  })
  const searchTypes = {
    name: radioButtonProps(userSearch.type, 'name'),
    email: radioButtonProps(userSearch.type, 'email'),
    phone: radioButtonProps(userSearch.type, 'phone')
  }
  const createLabelName = (label) => `${label[0].toUpperCase()}${label.slice(1)}`
  const radioListCB = (key) => (
    <div key={key}>
      <label htmlFor={key} className="mx-1">
        {createLabelName(key)}
      </label>
      <input {...searchTypes[key]} onChange={handleRadioChange} />
    </div>
  )
  const radioList = Object.keys(searchTypes).map(radioListCB)

  const formStyle = 'w-full flex flex-col items-center'
  const labelStyle = 'w-full flex flex-col justify-center items-center'
  const inputStyle = 'w-1/2 border-main-orange rounded-md border-2'
  const fieldsetStyle = 'flex flex-row w-1/2 mx-4 justify-between'
  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'

  const searchInputProps = {
    type: 'text',
    name: 'input',
    id: 'input',
    value: userSearch.input,
    onChange: handleInputChange,
    className: inputStyle
  }

  return (
    <form className={formStyle} onSubmit={handleFormSubmit}>
      <label className={labelStyle} htmlFor={'input'}>
        <span>Search Term:&nbsp;</span>
        <input {...searchInputProps} />
      </label>
      <fieldset className={fieldsetStyle}>{radioList}</fieldset>
      <button type="submit" className={buttonStyle}>
        Search
      </button>
    </form>
  )
}

export default AdminSearchForm
