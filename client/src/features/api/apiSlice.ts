import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
  endpoints: builder => ({
    getCourses: builder.query({ query: () => '/courses/' }),
    getSections: builder.query({ query: () => '/sections/' }),
    getUsers: builder.query({ query: () => '/users/' }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetSectionsQuery,
  useGetUsersQuery,
} = apiSlice;
