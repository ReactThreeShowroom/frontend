import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: ''
}
const sliceObj = {
  name: 'client',
  initialState,
  reducers: {
    clientLogout(state) {
      state = { ...initialState }
    }
  }
}
const clientSlice = createSlice(sliceObj)

export const { clientLogout } = clientSlice.actions

export default clientSlice.reducer
