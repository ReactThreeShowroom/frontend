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
