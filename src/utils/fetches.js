// export const BASE_URL = 'https://api-3frl.onrender.com'
export const BASE_URL = 'http://localhost:3000'

export const fetchUserIfToken = async (setter, token) => {
  try {
    const response = await fetch(`${BASE_URL}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    if (response.status === 500) throw response
    const _user = await response.json()
    setter(_user)
  } catch (error) {
    if (error.status === 500) return 500
  }
}

export const fetchUserLoader = async () => {
  const token = localStorage.getItem('token')
  console.log(token)
  if (token) {
    return fetch(`${BASE_URL}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
  } else {
    const error = { message: 'something went wrong' }
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json; utf-8' }
    })
  }
}

export const fetchClientLoader = ({ params }) => {
  return fetch(`${BASE_URL}/client/${params.clientId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

export const updateClientAction = async ({ request }) => {
  const method = request.method
  const {
    id,
    status,
    email,
    name,
    phone,
    original: oldClient
  } = (await request.formData())
    .entries()
    .reduce(
      (form, entry) => (
        entry[0] === 'original'
          ? (form[entry[0]] = JSON.parse(entry[1]))
          : (form[entry[0]] = entry[1]),
        form
      ),
      {}
    )

  let response = ''
  switch (method) {
    case 'DELETE': {
      const res = await fetch(`${BASE_URL}/client/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.status == 204) response = { success: 'Success deactivating client' }
      else throw { error: 'Something went wrong deactivating client' }
      break
    }
    case 'PUT': {
      if (id) {
        const res = await fetch(`${BASE_URL}/client/${id}?r=true`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        })
        if (res.status == 204) response = { success: 'Success reactivating client' }
        else throw { error: 'Something went wrong reactivating client' }
      }
      if (oldClient && Object.keys(oldClient).length) {
        const id = oldClient.id
        const newClient = { ...oldClient }
        if (name.length) newClient.name = name
        if (email.length) newClient.email = email
        if (phone.length) newClient.phone = phone

        const res = await fetch(`${BASE_URL}/client/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientData: newClient })
        })
        if (res.status == 204) response = { success: 'Success updating client' }
        else response = { error: 'Something went wrong updating client' }
      }
      break
    }
    default: {
      response = { error: 'Something went wrong editing client' }
    }
  }
  return response
}

export const loginUser = async ({ username, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth?type=login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    return await res.json()
  } catch (error) {
    console.error(error)
    if (error.status === 500) throw response
  }
}

export const createUser = async ({ email, username, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth?type=register`, {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    const res = await response.json()
    return res
  } catch (error) {
    console.error(error)
    if (error.status === 500) throw response
  }
}

export const handleAddSub = async ({ token, userId, type }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/subs/user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ type })
    })
    const newUser = await response.json()
    return newUser
  } catch (error) {
    console.error(error)
  }
}

export const handleAddClient = async ({ token, formState, userId }) => {
  try {
    const { name, email, phone } = formState
    const response = await fetch(`${BASE_URL}/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ clientData: { name, email, phone, userId } })
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
