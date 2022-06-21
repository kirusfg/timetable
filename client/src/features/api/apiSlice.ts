import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
  endpoints: builder => ({
    // TODO: create proper Response types for these queries
    getCourses: builder.query<any, void>({ query: () => '/courses/' }),
    getSections: builder.query<any, void>({ query: () => '/sections/' }),
    getUsers: builder.query<any, void>({ query: () => '/users/' }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetSectionsQuery,
  useGetUsersQuery,
} = apiSlice;
