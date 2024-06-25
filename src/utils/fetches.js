// export const URL = 'https://api-3frl.onrender.com'
export const URL = 'http://localhost:3000'

export const fetchUserIfToken = async (setter, token) => {
  try {
    const response = await fetch(`${URL}/user/me`, {
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
    const res = await fetch(`${URL}/auth?type=login`, {
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
    const response = await fetch(`${URL}/auth?type=register`, {
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
