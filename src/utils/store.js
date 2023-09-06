import { configureStore } from '@reduxjs/toolkit'

import { userReducer, modelReducer, authReducer, choiceReducer } from '../slices'

const store = configureStore({
  reducer: {
    user: userReducer,
    model: modelReducer,
    auth: authReducer,
    choice: choiceReducer
  }
})

export default store
