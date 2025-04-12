import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock profile data
const mockProfile = {
	firstName: "John",
	lastName: "Doe",
	email: "john@example.com",
	age: 30,
	weight: 180,
	heightInInches: 70,
	activityLevel: "Sedentary",
};

export const userProfileApi = createApi({
	reducerPath: 'userProfileApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['Profile'],
	endpoints: (builder) => ({
		// Get user profile
		getUserProfile: builder.query({
			query: (uid) => `/profile/${uid}`,
		}),
		createUserProfile: builder.mutation({
			query: (profile) => ({
				url: '/profile',
				method: 'POST',
				body: profile,
			}),
			invalidatesTags: ['Profile'],

		}),
		// Update profile
		updateUserProfile: builder.mutation({
			query: ({ uid, ...updates }) => ({
				url: `/profile/${uid}`,
				method: 'PUT',
				body: updates,
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const {
	useGetUserProfileQuery,
	useCreateUserProfileMutation,
	useUpdateUserProfileMutation,
} = userProfileApi;
