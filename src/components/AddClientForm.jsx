import { useState } from 'react'
import { handleFormChange, handleFormSubmit } from '../utils/eventHandlers'
import {
  inputTextNoAutoComplete,
  inputEmailNoAutoComplete,
  inputTelNoAutoComplete
} from '../utils/linkProps'
import FormInputAndLabel from './FormInputAndLabel'

const AddClientForm = () => {
  const formInitState = {
    name: '',
    email: '',
    phone: ''
  }

  const sectionClass =
    'flex flex-col justify-center items-center rounded-lg border-4 border-double border-main-orange mt-4 pt-4'
  const h2Class = 'text-lg font-bold'
  const formClass = 'w-full flex flex-col fustify-center items-center rounded-lg p-8'

  const [newClientForm, setNewClientForm] = useState(formInitState)
  const inputs = [
    inputTextNoAutoComplete(
      'clientNameEntry',
      handleFormChange,
      [newClientForm, setNewClientForm],
      'Client Name',
      undefined,
      'name',
      true
    ),
    inputEmailNoAutoComplete(
      'clientEmailEntry',
      handleFormChange,
      [newClientForm, setNewClientForm],
      'Client Email'
    ),
    inputTelNoAutoComplete(
      'clientPhoneEntry',
      handleFormChange,
      [newClientForm, setNewClientForm],
      'Client Phone'
    )
  ].map((props) => <FormInputAndLabel key={props.id} inputProps={props} />)

  return (
    <section className={sectionClass}>
      <h2 className={h2Class}>Add new client?</h2>
      <form className={formClass} onSubmit={handleFormSubmit}>
        {inputs}
        <button type="submit">Add Client</button>
        <button type="button" onClick={() => setNewClientForm(formInitState)}>
          Reset Form
        </button>
      </form>
    </section>
  )
}

export default AddClientForm
