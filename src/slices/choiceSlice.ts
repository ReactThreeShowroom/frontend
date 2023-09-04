import {createSlice} from '@reduxjs/toolkit'

export interface ChoiceState {
  pattern: string,
  color: string,
  model: string
}

const initialState: ChoiceState = {
  pattern: "",
  color: "",
  model: "",
}

export const choiceSlice = createSlice({
  name: 'choice',
  initialState,
  reducers: {
    //...
  }
})

export const { /* ... */} = choiceSlice.actions

export default choiceSlice.reducer
