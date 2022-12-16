import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query'

import {
	logoutUser,
	refreshToken as refreshTokenAction,
} from '../auth/authSlice'

import type { RootState } from '..'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8000/api/v1/',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.access_token
		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}
		return headers
	},
})

const authFetchBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	let error = result.error?.data as any
	let errorMessage = error.detail

	// The access token has expired
	if (
		errorMessage === 'Authentication credentials were not provided.' ||
		errorMessage === 'Given token not valid for any token type'
	) {
		const refreshToken = (api.getState() as RootState).auth.refresh_token

		if (refreshToken) {
			const refreshResult = (await baseQuery(
				{
					credentials: 'same-origin',
					url: 'auth/token/refresh/',
					method: 'POST',
					headers: [['Content-Type', 'application/json']],
					body: { refresh: refreshToken },
				},
				api,
				extraOptions
			)) as any

			if (refreshResult.data?.access) {
				// The access token has been refreshed; save it
				api.dispatch(refreshTokenAction(refreshResult.data.access))
			} else {
				// The refresh token has expired; logout
				api.dispatch(logoutUser())
			}

			// Retry the initial query
			result = await baseQuery(args, api, extraOptions)
		} else {
			// The refresh token is missing (for some reason); logout
			api.dispatch(logoutUser())
		}
	}

	return result
}

export default authFetchBaseQuery
