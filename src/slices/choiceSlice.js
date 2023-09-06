import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  pattern: '',
  color: '',
  model: ''
}

const sliceObj = {
  name: 'choice',
  initialState,
  reducers: {
    loadChoice(state, action) {
      state = { ...action.payload }
    },
    createChoice(state, action) {
      state = { ...action.payload }
    },
    deleteChoice(state) {
      state = { ...initialState }
    },
    editChoice(state, action) {
      state = { ...action.payload }
    }
  }
}

export const choiceSlice = createSlice(sliceObj)

export const { loadChoice, createChoice, deleteChoice, editChoice } = choiceSlice.actions

export default choiceSlice.reducer
