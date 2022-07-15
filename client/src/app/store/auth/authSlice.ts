import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import type User from '../../../types/User'

export type Login = {
  username: string
  password: string
}

export interface AuthState {
  access_token: string | null
  refresh_token: string | null
  user: User | null
}

const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.user = action.payload.user
    },
  },
})

export const { setUser } = authSlice.actions

export const selectUser = (state: RootState): User | null =>
  state.auth.user
