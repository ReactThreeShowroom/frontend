import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  name: ''
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    modelLogout(state) {
      state = { ...initialState }
    }
  }
})

export const { modelLogout } = modelSlice.actions

export default modelSlice.reducer
