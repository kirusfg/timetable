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
    loginUser: (state, action: PayloadAction<AuthState>) => {
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.user = action.payload.user
    },
    logoutUser: (state) => {
      state.access_token = null
      state.refresh_token = null
      state.user = null
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload
    },
  },
})

export const { loginUser, logoutUser, refreshToken } = authSlice.actions

export const selectUser = (state: RootState): User | null => state.auth.user
