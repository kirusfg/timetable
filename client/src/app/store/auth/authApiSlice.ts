import { apiSlice } from '../api/apiSlice'

import { AuthState, Login, loginUser, logoutUser } from './authSlice'

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<AuthState, any>({
      query: (login: Login) => ({
        url: 'auth/login/',
        method: 'POST',
        body: login,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled
          dispatch(loginUser(user))
        } catch (error) {
          console.error('Auth: the login query did not fullfil', error)
        }
      },
      async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved }) {
        try {
          await cacheEntryRemoved
          dispatch(logoutUser())
        } catch (error) {
          console.error(
            'Auth: the login cache entry failed to be removed',
            error
          )
        }
      },
      keepUnusedDataFor: 3600,
      providesTags: ['User'],
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/logout/',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch }) {
        dispatch(logoutUser())
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useLoginQuery, useLogoutMutation } = authApi
