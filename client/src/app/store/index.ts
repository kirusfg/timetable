import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { apiSlice } from './api/apiSlice'
import { timetableSlice } from './timetable/timetableSlice'
import { authSlice } from './auth/authSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistCombineReducers(persistConfig, {
  timetable: timetableSlice.reducer,
  auth: authSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
