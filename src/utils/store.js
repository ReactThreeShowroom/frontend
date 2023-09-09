import { configureStore } from '@reduxjs/toolkit'

import {
  authReducer,
  choiceReducer,
  choicesReducer,
  clientReducer,
  clientsReducer,
  modelReducer,
  userReducer,
  usersReducer
} from '../slices'

const store = configureStore({
  reducer: {
    auth: authReducer,
    choice: choiceReducer,
    choices: choicesReducer,
    client: clientReducer,
    clients: clientsReducer,
    model: modelReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store
