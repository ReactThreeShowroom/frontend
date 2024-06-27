import { useState } from 'react'
import { handleAddClient } from '../utils/fetches'
import { inputStyles, labelStyles } from '../Styles/formStyles'

const AddClientForm = ({ userId, token, getClients }) => {
  const formInitState = {
    name: '',
    email: '',
    phone: ''
  }
  const sectionClass =
    'flex flex-col justify-center items-center rounded-lg border-4 border-double border-main-orange m-4 pt-4 w-80 h-[500px] shrink-0'
  const h2Class = 'text-lg font-bold'
  const formClass = 'w-full flex flex-col fustify-center items-center rounded-lg p-8 shrink-0'
  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'
  const inputStyle =
    'w-full p-1 m-1 shadow-sm border-2 border-main-orange rounded-md text-grey-darker outline-none'

  const [newClientForm, setNewClientForm] = useState(formInitState)

  const handleFormChange = (e) => {
    setNewClientForm({ ...newClientForm, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newClient = await handleAddClient({ token, formState: newClientForm, userId })
      if (newClient.id) {
        await getClients()
        setNewClientForm(formInitState)
      } else throw 'could not make client'
    } catch (error) {
      console.error(error)
    }
  }

  const { name, email, phone } = newClientForm

  const nameProps = {
    id: 'name',
    name: 'clientNameEntry',
    className: inputStyle,
    type: 'text',
    value: name,
    onChange: handleFormChange,
    placeholder: 'John Doe',
    required: true
  }
  const emailProps = {
    id: 'email',
    name: 'clientEmailEntry',
    className: inputStyle,
    type: 'email',
    value: email,
    onChange: handleFormChange,
    placeholder: 'email@domain.com',
    required: false
  }
  const phoneProps = {
    id: 'phone',
    name: 'clientPhoneEntry',
    className: inputStyle,
    type: 'tel',
    value: phone,
    onChange: handleFormChange,
    placeholder: '(111)222-3333',
    required: false
  }

  return (
    <section className={sectionClass}>
      <h2 className={h2Class}>Add New Client?</h2>
      <form className={formClass} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={labelStyles} htmlFor={'clientNameEntry'}>
            Name
          </label>
          <input {...nameProps} />
        </div>
        <div className="mb-4">
          <label className={labelStyles} htmlFor={'clientEmailEntry'}>
            Email
          </label>
          <input {...emailProps} />
        </div>
        <div className="mb-4">
          <label className={labelStyles} htmlFor={'clientPhoneEntry'}>
            Phone
          </label>
          <input {...phoneProps} />
        </div>
        <button type="submit" className={buttonStyle}>
          Add Client
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => setNewClientForm(formInitState)}>
          Reset Form
        </button>
      </form>
    </section>
  )
}

export default AddClientForm
