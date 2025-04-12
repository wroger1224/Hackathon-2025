import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
		signInError: null,
		signUpError: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
			setUser: (state, action) => {
				state.user = action.payload
				state.loading = false
			},
			setSignInError: (state, action) => {
				state.error = action.payload
				state.loading = false
			},
			setSignUpError: (state, action) => {
				state.error = action.payload
				state.loading = false
			}
		}
})

export const { setUser, setSignInError, setSignUpError } = userSlice.actions

export default userSlice.reducer


