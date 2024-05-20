export const fetchUserIfToken = async (setter, token) => {
  try {
    const response = await fetch('https://api-3frl.onrender.com/user/me', {
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
