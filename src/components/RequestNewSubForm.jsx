import { useState } from 'react'
import { handleAddSub } from '../utils/fetches'
import { useOutletContext } from 'react-router'

const RequestNewSubForm = () => {
  const [subType, setSubType] = useState('year')
  const {
    state: { user, token },
    setters: { setUser, setToken }
  } = useOutletContext()

  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newUser = await handleAddSub({ token, userId: user.id, type: subType })
      if (newUser) {
        setUser(newUser)
      } else throw 'Something went wrong with creating Sub'
    } catch (error) {
      console.log(error)
    }
  }
  const handleRadioChange = (e) => setSubType(e.target.value)

  const radioButtonProps = (compare, label, onChange) => ({
    type: 'radio',
    id: label,
    name: label,
    value: label,
    checked: compare === label,
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

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className={buttonStyle}>
        Request New Sub
      </button>
      <fieldset className={'flex flex-row w-1/2 mx-4 justify-between'}>{radioList}</fieldset>
    </form>
  )
}

export default RequestNewSubForm
