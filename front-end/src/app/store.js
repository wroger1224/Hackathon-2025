import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../reducers/userSlice'

export const store = configureStore({ 
	reducer: {
		users: usersReducer,
	}
})

