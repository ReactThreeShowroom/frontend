import { useState } from 'react'
import { handleFormChange, handleFormSubmit } from '../utils/eventHandlers'

const AddClientForm = () => {
  const formInitState = {
    name: '',
    email: '',
    phone: ''
  }
  const [newClientForm, setNewClientForm] = useState(formInitState)

  const localInputChange = (ev) => {
    handleFormChange(ev, setNewClientForm, newClientForm)
  }

  return (
    <section>
      <p>Add new client?</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="clientNameEntry">
          <input
            placeholder="client name"
            onChange={localInputChange}
            name="clientNameEntry"
            type="text"
            value={newClientForm.name}
          />
        </label>
        <label htmlFor="clientEmailEntry">
          <input
            placeholder="client email"
            onChange={localInputChange}
            name="clientEmailEntry"
            type="email"
            value={newClientForm.email}
          />
        </label>
        <label htmlFor="clientPhoneEntry">
          <input
            placeholder="client phone"
            onChange={localInputChange}
            name="clientPhoneEntry"
            type="tel"
            value={newClientForm.email}
          />
        </label>
        <button type="submit">Add Client</button>
        <button type="button" onClick={() => setNewClientForm(formInitState)}>
          Reset Form
        </button>
      </form>
    </section>
  )
}

export default AddClientForm
