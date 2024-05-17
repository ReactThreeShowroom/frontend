export const fetchUserIfToken = async (setter, token) => {
  const response = await fetch('https://api-3frl.onrender.com/user/me', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
  const _user = await response.json()
  setter(_user)
}
