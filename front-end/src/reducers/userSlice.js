import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	loading: false,
	error: null,
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
	},

})

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
