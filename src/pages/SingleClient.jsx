import { useEffect, useState } from 'react'
import { useActionData, useLoaderData, useNavigate, useNavigation } from 'react-router'
import { Form } from 'react-router-dom'

const SingleClient = () => {
  const client = useLoaderData()
  let message = useActionData()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!client.id) navigate('/')
  }, [])

  const clientStatus = client.status === 'active'

  const nameInputProps = { id: 'name', name: 'name', type: 'text', placeholder: client.name }
  const emailInputProps = { id: 'email', name: 'email', type: 'email', placeholder: client.email }
  const phoneInputProps = { id: 'phone', name: 'phone', type: 'tel', placeholder: client.phone }
  const clientInputProps = {
    id: 'original',
    name: 'original',
    hidden: true,
    readOnly: true,
    value: JSON.stringify(client)
  }

  return (
    <div>
      <button
        type="button"
        onClick={(e) => {
          setEdit(!edit)
        }}>
        {!edit ? 'Edit' : 'Cancel Editing'}
      </button>
      <Form method={clientStatus ? 'DELETE' : 'PUT'}>
        <input hidden readOnly type="text" id={'id'} name={'id'} value={client.id} />
        <button type="submit">{clientStatus ? 'Deactivate' : 'Reactivate'}</button>
      </Form>
      {!edit ? (
        <div>
          <p>{'name: ' + client.name}</p>
          <p>{'email: ' + client.email}</p>
          <p>{'phone: ' + client.phone}</p>
        </div>
      ) : (
        <Form
          onSubmit={() => {
            if (message?.success) {
              setEdit(false)
            }
          }}
          method="PUT">
          <label htmlFor="name">
            Name:&nbsp;
            <input {...nameInputProps} />
          </label>
          <label htmlFor="email">
            Email:&nbsp;
            <input {...emailInputProps} />
          </label>
          <label htmlFor="phone">
            Phone:&nbsp;
            <input {...phoneInputProps} />
          </label>
          <input {...clientInputProps} />
          <button type="submit">Submit</button>
        </Form>
      )}
      {!edit && message?.success && (
        <p className={'text-green-500 text-xs italic'}>{message.success}</p>
      )}
      {message?.error && <p className={'text-red-600 text-xs italic'}>{message.error}</p>}
    </div>
  )
}

export default SingleClient
