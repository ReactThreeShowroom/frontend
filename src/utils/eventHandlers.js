import { authLogout } from '../slices/authSlice'
import { choiceLogout } from '../slices/choiceSlice'
import { choicesLogout } from '../slices/choicesSlice'
import { clientLogout } from '../slices/clientSlice'
import { clientsLogout } from '../slices/clientsSlice'
import { modelLogout } from '../slices/modelSlice'
import { userLogout } from '../slices/userSlice'
import { usersLogout } from '../slices/usersSlice'
import { changeSelected } from '../slices/navSlice'

// export function handleNavClick(e, setter1) {
//   setter1(e.target.to)
// }

export function handleNavClick(dispatch, link) {
  dispatch(changeSelected({ selectedPath: link.path }))
}

export const handleSignOut = (dispatch, navigate) => {
  localStorage.removeItem('token')
  dispatch(authLogout())
  dispatch(choiceLogout())
  dispatch(choicesLogout())
  dispatch(clientLogout())
  dispatch(clientsLogout())
  dispatch(modelLogout())
  dispatch(userLogout())
  dispatch(usersLogout())
  navigate('/')
  dispatch(changeSelected({ selectedPath: '/' }))
}
