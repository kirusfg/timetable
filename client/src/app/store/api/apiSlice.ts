import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Course from "../../../types/Course";
import Section from "../../../types/Section";
import User from "../../../types/User";
import {groupSections} from "../timetable/timetableSlice";

export type ApiResponse<T> = {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1" }),
  endpoints: builder => ({
    getCourses: builder.query<Course[], void>({
      query: () => "/courses/",
      transformResponse: (response: ApiResponse<Course>) => response.results,
    }),
    getSections: builder.query<ApiResponse<Section>, void>({
      query: () => "/sections/",
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const { data: sections } = await queryFulfilled
          dispatch(groupSections(sections.results))
        } catch {
          console.log("Error");
        }
      }
    }),
    getUserSchedule: builder.query<ApiResponse<Section>, User["username"]>({
      query: (username) => `/user/${username}/schedule`
    }),
    getUsers: builder.query<ApiResponse<User>, void>({ query: () => "/users/" }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetSectionsQuery,
  useGetUsersQuery,
} = apiSlice;