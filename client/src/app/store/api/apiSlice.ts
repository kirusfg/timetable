import { createApi } from '@reduxjs/toolkit/query/react'

import authFetchBaseQuery from './authFetchBaseQuery'

export const apiSlice = createApi({
	baseQuery: authFetchBaseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		health: builder.query<any, void>({
			query: () => '/',
			keepUnusedDataFor: 0,
		}),
	}),
})
