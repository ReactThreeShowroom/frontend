import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { authLogout } from '../slices/authSlice'
import { choiceLogout } from '../slices/choiceSlice'
import { choicesLogout } from '../slices/choicesSlice'
import { clientLogout } from '../slices/clientSlice'
import { clientsLogout } from '../slices/clientsSlice'
import { modelLogout } from '../slices/modelSlice'
import { userLogout } from '../slices/userSlice'
import { usersLogout } from '../slices/usersSlice'

export const useSignOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  localStorage.removeItem('token')
  dispatch(authLogout)
  dispatch(choiceLogout)
  dispatch(choicesLogout)
  dispatch(clientLogout)
  dispatch(clientsLogout)
  dispatch(modelLogout)
  dispatch(userLogout)
  dispatch(usersLogout)
  navigate('/')
}
