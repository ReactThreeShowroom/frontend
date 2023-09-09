import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const sliceObj = {
  name: 'clients',
  initialState,
  reducers: {
    clientsLogout(state) {
      state = []
    }
  }
}
const clientsSlice = createSlice(sliceObj)

export const { clientsLogout } = clientsSlice.actions

export default clientsSlice.reducer
