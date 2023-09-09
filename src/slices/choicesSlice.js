import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const sliceObj = {
  name: 'choices',
  initialState,
  reducers: {
    choicesLogout(state) {
      state = []
    }
  }
}
const choicesSlice = createSlice(sliceObj)

export const { choicesLogout } = choicesSlice.actions

export default choicesSlice.reducer
