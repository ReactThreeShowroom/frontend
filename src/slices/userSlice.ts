import {createSlice} from '@reduxjs/toolkit'

export interface UserState {
  name: string,
  email: string,
  phone: string,
  isAdmin: boolean,
  subStart: Date | null,

}

const initialState: UserState = {
  name: "",
  email: "",
  phone: '',
  isAdmin: false,
  subStart: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //...
  }
})

export const { /* ... */} = userSlice.actions

export default userSlice.reducer
