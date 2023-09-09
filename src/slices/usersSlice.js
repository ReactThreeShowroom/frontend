import { createSlice } from '@reduxjs/toolkit'

export const initialState = []
const sliceObj = {
  name: 'users',
  initialState,
  reducers: {
    usersLogout(state) {
      state = []
    }
  }
}
const usersSlice = createSlice(sliceObj)

export const { usersLogout } = usersSlice.actions

export default usersSlice.reducer
