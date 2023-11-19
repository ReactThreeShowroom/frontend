import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { value: 'Home', path: '/', active: true, selected: false },
  { value: 'Showroom', path: '/showroom', active: true, selected: false },
  { value: 'Admin', path: '/admin', active: false, selected: false },
  { value: 'Account', path: '/account', active: false, selected: false },
  { value: 'Sign Up', path: '/signup', active: true, selected: false },
  { value: 'Sign In', path: '/signin', active: true, selected: false }
]
const sliceObj = {
  name: 'nav',
  initialState,
  reducers: {
    changeSelected(state, action) {
      state = state.map((path) => {
        if (path.path === action.payload.selectedPath) {
          path.selected = true
          return path
        }
        path.selected = false
        return path
      })
    },
    changeActive(state, action) {
      state = state.map((path) => {
        action.payload.activeRoutes.forEach((activeRoute) => {
          if (path.path === activeRoute) path.active = true
        })
        return path
      })
    }
  }
}
const navSlice = createSlice(sliceObj)

export const { changeSelected } = navSlice.actions

export default navSlice.reducer
