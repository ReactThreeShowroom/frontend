import {createSlice} from '@reduxjs/toolkit'

export interface ModelState {
  name: string
}

const initialState: AuthState = {
  name: ""
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    //...
  }
})

export const { /* ... */} = modelSlice.actions

export default modelSlice.reducer
