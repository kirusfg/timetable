import { apiSlice } from '../api/apiSlice'

import type Course from '../../../types/Course'
import type Section from '../../../types/Section'
import type User from '../../../types/User'
import type Schedule from '../../../types/Schedule'

import { groupSections } from '../timetable/timetableSlice'

const timetableApi = apiSlice.injectEndpoints({
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
  }),
})

export const {
  useGetCoursesQuery,
  useGetSectionsQuery,
  useGetUserScheduleQuery,
} = timetableApi
