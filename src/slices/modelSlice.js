import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: ''
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    //...
  }
})

export const {
  /* ... */
} = modelSlice.actions

export default modelSlice.reducer
