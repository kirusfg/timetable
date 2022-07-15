import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Course from '../../../types/Course'
import Section from '../../../types/Section'
import User from '../../../types/User'
import { groupSections } from '../timetable/timetableSlice'
import type { Login } from '../auth/authSlice'
import type { RootState } from '..'

export type ApiResponse<T> = {
  count: number
  next?: string
  previous?: string
  results: T[]
}

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
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => 'courses/',
      transformResponse: (response: ApiResponse<Course>) => response.results,
    }),
    getSections: builder.query<ApiResponse<Section>, void>({
      query: () => 'sections/',
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: sections } = await queryFulfilled
          dispatch(groupSections(sections.results))
        } catch {
          console.log('Error')
        }
      },
    }),
    getUserSchedule: builder.query<ApiResponse<Section>, User['username']>({
      query: (username) => `user/${username}/schedule`,
    }),
    getUsers: builder.query<ApiResponse<User>, void>({
      query: () => 'users/',
    }),
    login: builder.query<any, any>({
      query: (login: Login) => ({
        url: 'auth/login/',
        method: 'POST',
        body: login,
      }),
    }),
  }),
})

export const {
  useGetCoursesQuery,
  useGetSectionsQuery,
  useGetUsersQuery,
  useLoginQuery,
} = apiSlice
