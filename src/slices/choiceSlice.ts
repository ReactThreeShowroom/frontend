import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ChoiceState {
  id?: string,
  pattern: string,
  color: string,
  model: string
}

const initialState: ChoiceState = {
  id: "",
  pattern: "",
  color: "",
  model: "",
}

const sliceObj = {
  name: 'choice',
  initialState,
  reducers: {
    loadChoice (state: ChoiceState, action: PayloadAction<ChoiceState>) { state = {...action.payload } },
    createChoice(state: ChoiceState, action: PayloadAction<ChoiceState>) { state = {...action.payload } },
    deleteChoice(state: ChoiceState) { state = {...initialState} },
    editChoice(state: ChoiceState, action: PayloadAction<ChoiceState>) { state = {...action.payload } },
  }
}

export const choiceSlice = createSlice(sliceObj)

export const { loadChoice, createChoice, deleteChoice, editChoice} = choiceSlice.actions

export default choiceSlice.reducer
