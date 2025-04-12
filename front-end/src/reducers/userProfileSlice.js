import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchUserProfile = createAsyncThunk(
	'userProfile/fetchUserProfile',
	async (uid, { rejectWithValue }) => {
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			return {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				age: 30,
				weight: 180,
				heightInInches: 70,
				activityLevel: 'Moderately Active',
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateUserProfile = createAsyncThunk(
	'userProfile/updateUserProfile',
	async (profile, { rejectWithValue }) => {
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			return profile;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const createUserProfile = createAsyncThunk(
	'userProfile/createUserProfile',
	async (profile, { rejectWithValue }) => {
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			return profile;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	profile: null,
	isLoading: false,
	error: null
};

const userProfileSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {
		clearProfile: (state) => {
			state.profile = null;
			state.isLoading = false;
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// Fetch Profile
			.addCase(fetchUserProfile.pending, (state) => {
				state.isLoading = true;
				state.error = null;	
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profile = action.payload;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// Update Profile
			.addCase(updateUserProfile.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profile = action.payload;
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// Create Profile
			.addCase(createUserProfile.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profile = action.payload;
			})
			.addCase(createUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export const { clearProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer; 