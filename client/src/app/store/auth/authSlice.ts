import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import type User from '../../../types/User'

export type Login = {
  username: string
  password: string
}

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state = action.payload
    },
  },
})

export const { setUser } = authSlice.actions

export const selectUser = (state: RootState): User | null =>
  state.auth.user
