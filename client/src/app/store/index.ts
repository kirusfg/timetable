import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import { timetableSlice } from './timetable/timetableSlice'
import { authSlice } from './auth/authSlice'

export const store = configureStore({
  reducer: {
    timetable: timetableSlice.reducer,
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
