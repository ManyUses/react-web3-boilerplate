import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import multicall from './multicall/reducer'

const PERSISTED_KEYS: string[] = ['user']

const store = configureStore({
  reducer: {
    application,
    user,
    multicall,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false, immutableCheck: false }),
    ...(typeof localStorage !== 'undefined' ? [save({ states: PERSISTED_KEYS })] : []),
  ],
  preloadedState: typeof localStorage !== 'undefined' ? load({ states: PERSISTED_KEYS }) : {},
  devTools: process.env.NODE_ENV === 'development',
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
