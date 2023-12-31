import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  isAdmin: false,
  subStart: null,
  subEnd: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, action) {
      state = { ...action.payload }
    },
    userLogout(state) {
      state = { ...initialState }
    }
  }
})

export const { userLogout } = userSlice.actions

export default userSlice.reducer
