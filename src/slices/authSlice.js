import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token')
}
const sliceObj = {
  name: 'auth',
  initialState,
  reducers: {
    authLogin(state, action) {
      state.token = action.payload.token
    },
    authLogout(state) {
      state.token = null
    }
  }
}
const authSlice = createSlice(sliceObj)

export const { authLogin, authLogout } = authSlice.actions

export default authSlice.reducer
