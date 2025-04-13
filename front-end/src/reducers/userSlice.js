import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userActivityApi, userApi } from "../services/Firebase/apiService";

const initialState = {
    user: null,
    loading: true,
		signInError: null,
		signUpError: null,
    userData: null,
    userDataError: null,
}

// User Activity Thunks
export const createUserActivityThunk = createAsyncThunk(
    'user/createUserActivity',
    async (userActivity, { rejectWithValue }) => {
        try {
            const response = await userActivityApi.createUserActivity(userActivity);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserActivityThunk = createAsyncThunk(
    'user/updateUserActivity',
    async ({ id, userActivity }, { rejectWithValue }) => {
        try {
            const response = await userActivityApi.updateUserActivity(id, userActivity);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUserActivityThunk = createAsyncThunk(
    'user/deleteUserActivity',
    async (id, { rejectWithValue }) => {
        try {
            await userActivityApi.deleteUserActivity(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserDataThunk = createAsyncThunk(
    'user/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userApi.fetchUserData();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
			setUser: (state, action) => {
				state.user = action.payload
				state.loading = false
			},
			setSignInError: (state, action) => {
				state.signInError = action.payload
				state.loading = false
			},
			setSignUpError: (state, action) => {
				state.signUpError = action.payload
				state.loading = false
			},
			addUserActivity: (state, action) => {
				state.userActivities.push(action.payload)
			},
			updateUserActivity: (state, action) => {
				const index = state.userActivities.findIndex(activity => activity.id === action.payload.id)
				if (index !== -1) {
					state.userActivities[index] = action.payload
				}
			},
			deleteUserActivity: (state, action) => {
				state.userActivities = state.userActivities.filter(activity => activity.id !== action.payload)
			},
			setUserActivityError: (state, action) => {
				state.userActivityError = action.payload
			},
			setUserData: (state, action) => {
				state.userData = action.payload;
				state.loading = false;
			},
			setUserDataError: (state, action) => {
				state.userDataError = action.payload;
				state.loading = false;
			},
		},
    extraReducers: (builder) => {
        builder
            // Create User Activity
            .addCase(createUserActivityThunk.fulfilled, (state, action) => {
                state.userActivities.push(action.payload);
            })
            .addCase(createUserActivityThunk.rejected, (state, action) => {
                state.userActivityError = action.payload;
            })
            // Update User Activity
            .addCase(updateUserActivityThunk.fulfilled, (state, action) => {
                const index = state.userActivities.findIndex(activity => activity.id === action.payload.id);
                if (index !== -1) {
                    state.userActivities[index] = action.payload;
                }
            })
            .addCase(updateUserActivityThunk.rejected, (state, action) => {
                state.userActivityError = action.payload;
            })
            // Delete User Activity
            .addCase(deleteUserActivityThunk.fulfilled, (state, action) => {
                state.userActivities = state.userActivities.filter(activity => activity.id !== action.payload);
            })
            .addCase(deleteUserActivityThunk.rejected, (state, action) => {
                state.userActivityError = action.payload;
            })
            .addCase(fetchUserDataThunk.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserDataThunk.rejected, (state, action) => {
                state.userDataError = action.payload;
                state.loading = false;
            });
    }
})

export const { 
	setUser, 
	setSignInError, 
	setSignUpError,
	addUserActivity,
	updateUserActivity,
	deleteUserActivity,
	setUserActivityError,
	setUserData,
	setUserDataError
} = userSlice.actions

export default userSlice.reducer


