import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: string
}

const initialState: AuthState = { token: "" }
const sliceObj = {
  name: 'auth',
  initialState,
  reducers: {
    login (state: AuthState, action: PayloadAction<string>) {
      state.token = action.payload
    },
    logout (state: AuthState) {
      state.token = ''
    },
  },
}
const authSlice = createSlice(sliceObj)

export const { login, logout } = authSlice.actions

export default authSlice.reducer
