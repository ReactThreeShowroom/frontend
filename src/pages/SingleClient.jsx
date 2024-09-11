import { useEffect, useState } from 'react'
import { useActionData, useLoaderData, useNavigate, useNavigation } from 'react-router'
import { Form, Link } from 'react-router-dom'

const SingleClient = () => {
  const client = useLoaderData()
  let message = useActionData()
  const navigate = useNavigate()
  let navigation = useNavigation()
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!client.id) navigate('/')
  }, [])

  console.log(navigation)

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
      <Form method="POST">
        <input hidden readOnly type="text" id={'clientId'} name={'clientId'} value={client.id} />
        <input
          hidden
          readOnly
          type="text"
          id={'name'}
          name={'name'}
          value={'New Favorite #' + Math.floor(Math.random() * 101)}
        />
        <button
          type="submit"
          className={
            'text-main-orange bg-transparent border-2 border-main-orange rounded-md p-1 m-1'
          }
          disabled={navigation.state !== 'idle'}>
          Create New Favorite
        </button>
      </Form>
      {!edit ? (
        <div>
          <p>{'name: ' + client.name}</p>
          <p>{'email: ' + client.email}</p>
          <p>{'phone: ' + client.phone}</p>
          <div className={'flex flex-col'}>
            {!!client.favorites.length &&
              client.favorites.map((fav) => {
                return (
                  <Link
                    className={'text-main-orange m-1'}
                    key={fav.id}
                    to={`/showroom/c/${client.id}/m/${fav.model.path}?f=${fav.id}`}>
                    {fav.name}
                  </Link>
                )
              })}
          </div>
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
