import { configureStore } from '@reduxjs/toolkit'
import {userReducer, modelReducer, authReducer, choiceReducer} from '../slices'
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    model: modelReducer,
    auth: authReducer,
    choice: choiceReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
