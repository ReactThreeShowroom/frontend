import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: '' }
const sliceObj = {
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token
    },
    logout(state) {
      state.token = ''
    }
  }
}
const authSlice = createSlice(sliceObj)

export const { login, logout } = authSlice.actions

export default authSlice.reducer
