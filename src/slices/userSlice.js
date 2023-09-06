import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  isAdmin: false,
  subStart: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //...
  }
})

export const {
  /* ... */
} = userSlice.actions

export default userSlice.reducer
