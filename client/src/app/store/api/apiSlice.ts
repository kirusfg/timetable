import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Course from '../../../types/Course'
import Section from '../../../types/Section'
import User from '../../../types/User'
import { groupSections } from '../timetable/timetableSlice'
import { AuthState, Login, loginUser, logoutUser } from '../auth/authSlice'
import type { RootState } from '..'
import type Schedule from '../../../types/Schedule'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => 'courses/',
      keepUnusedDataFor: 5,
    }),
    getSections: builder.query<Section[], void>({
      query: () => 'sections/',
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: sections } = await queryFulfilled
          dispatch(groupSections(sections))
        } catch {
          console.log('Error')
        }
      },
      keepUnusedDataFor: 5,
    }),
    getUserSchedule: builder.query<Schedule, User['username']>({
      query: (username) => `user/${username}/schedule`,
    }),
    getUsers: builder.query<User, void>({
      query: () => 'users/',
    }),
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
        } catch {
          console.log('Error')
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

export const {
  useGetCoursesQuery,
  useGetSectionsQuery,
  useGetUsersQuery,
  useLoginQuery,
  useLogoutMutation,
} = apiSlice
