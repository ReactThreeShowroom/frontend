import { redirect } from 'react-router'

// export const BASE_URL = 'https://api-1i72.onrender.com'
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

export const fetchPendingSubs = async (token) => {
  return await (
    await fetch(`${BASE_URL}/auth/pending-subs`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
  ).json()
}

export const fetchUserForAdminLoader = async (userId) => {
  return !userId
    ? {}
    : fetch(`${BASE_URL}/auth/admin/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
}

export const updateSubAction = async (subId, status, type) => {
  const res = await fetch(`${BASE_URL}/auth/subs/${subId}?status=${status}&type=${type}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
  return await res.json()
}

export const fetchUserLoader = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const userRes = await fetch(`${BASE_URL}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    if (userRes.status !== 200) {
      localStorage.setItem('token', '')
      const error = { message: 'something went wrong' }
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: { 'Content-Type': 'application/json; utf-8' }
      })
    }
    return userRes
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
  // console.log(request)
  let response = ''
  switch (method) {
    case 'DELETE': {
      const { id } = (await request.formData())
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
      const res = await fetch(`${BASE_URL}/client/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.status == 204) response = { success: 'Success deactivating client' }
      else throw { error: 'Something went wrong deactivating client' }
      break
    }
    case 'PUT': {
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
    case 'POST': {
      const favoriteData = Object.fromEntries(await request.formData())
      const res = await fetch(`${BASE_URL}/favorite/fav`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteData })
      })
      if (res.status === 201) {
        response = { message: 'Success creating favorite!', data: await res.json() }
        return redirect(
          `/showroom/c/${response.data.clientId}/m/${response.data.model.path}?f=${response.data.id}`
        )
      } else response = { error: 'Something went wrong creating favorite' }
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

export const getAllUsersAdmin = async ({ setter, token, skip = 0, take = 0 }) => {
  // /user/admin?s=xx&t=yy
  try {
    const response = await fetch(`${BASE_URL}/user/admin?s=${skip}&t=${take}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    setter(await response.json())
  } catch (error) {
    console.error(error)
  }
}

export const getOneUserAdmin = async ({ token, userId }) => {
  const response = await fetch(`${BASE_URL}/user/admin/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (response.ok) {
    return await response.json()
  } else {
    const error = { message: 'something went wrong' }
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json; utf-8' }
    })
  }
}

export const fetchColorLoader = async () => {
  const response = await fetch(`${BASE_URL}/favorite/color`, {
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    const colors = (await response.json()).reduce((colors, color) => {
      // console.log(colors, color)
      colors[color.code] = color
      return colors
    }, {})
    // console.log('In Loader', colors)
    return colors
  } else {
    const error = { message: 'something went wrong' }
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json; utf-8' }
    })
  }
}

export const fetchModelsLoader = async () => {
  const response = await fetch(`${BASE_URL}/favorite/model`, {
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    const _models = await response.json()
    const models = _models.reduce((models, model) => {
      // console.log(models, model)
      models[model.path] = model
      return models
    }, {})
    // console.log('In Loader', models)
    return models
  } else {
    const error = { message: 'something went wrong' }
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json; utf-8' }
    })
  }
}

export const fetchFavoriteLoader = async (favId) => {
  const response = await fetch(`${BASE_URL}/favorite/fav?type=single&id=${favId}`)
  const fav = await response.json()
  return fav
}
// export const fetchFavoritesLoader = async (clientId) => {
//   const response = await fetch(`${BASE_URL}/client/${clientId}`, {
//     headers: { 'Content-Type': 'application/json' }
//   })
//   if (response.ok) {
//     const client = await response.json()
//     return client
//   } else {
//     const error = { message: 'something went wrong' }
//     return new Response(JSON.stringify(error), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json; utf-8' }
//     })
//   }
// }

export const updateFavoriteAction = async (favId, favoriteData) => {
  try {
    const response = await fetch(`${BASE_URL}/favorite/fav/${favId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favoriteData)
    })
    const fav = await response.json()
    return fav
  } catch (err) {
    console.log(err)
  }
}
