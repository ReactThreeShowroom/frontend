import { useState } from 'react'
import { handleAddSub } from '../utils/fetches'
import { useOutletContext } from 'react-router'

const RequestNewSubForm = () => {
  const [subType, setSubType] = useState('year')
  const [message, setMessage] = useState('')
  const {
    state: { user, token },
    setters: { setUser, setToken }
  } = useOutletContext()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setMessage('')
      const newUser = await handleAddSub({ token, userId: user.id, type: subType })
      if (newUser) {
        setUser(newUser)
      } else throw { message: 'Something went wrong with creating subscription' }
    } catch (error) {
      setMessage(error.message)
    }
  }
  const handleRadioChange = (e) => setSubType(e.target.value)

  const radioButtonProps = (type, label, onChange) => ({
    type: 'radio',
    id: label,
    name: label,
    value: label,
    checked: type === label,
    onChange: onChange,
    className: 'mx-1'
  })

  const timeLength = {
    one: radioButtonProps(subType, 'one', handleRadioChange),
    six: radioButtonProps(subType, 'six', handleRadioChange),
    year: radioButtonProps(subType, 'year', handleRadioChange)
  }

  const handleLabelName = (label) => `${label[0].toUpperCase()}${label.slice(1)}`

  const radioListCB = (key) => {
    return (
      <div key={key}>
        <label htmlFor={key} className="mx-1">
          {handleLabelName(key)}
        </label>
        <input {...timeLength[key]} />
      </div>
    )
  }
  const radioList = Object.keys(timeLength).map(radioListCB)

  const formContainer = 'w-full flex flex-col items-center'
  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'
  const errorText = 'text-red-600 text-xs italic'
  const fieldContainer = 'flex flex-row w-1/2 mx-4 justify-between'

  return (
    <form className={formContainer} onSubmit={handleSubmit}>
      <button type="submit" className={buttonStyle}>
        Request New Sub
      </button>
      {<p className={errorText}>&nbsp;{message}</p>}
      <fieldset className={fieldContainer}>{radioList}</fieldset>
    </form>
  )
}

export default RequestNewSubForm
