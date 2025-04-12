import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import userProfileReducer from './reducers/userProfileSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        userProfile: userProfileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userProfileApi.middleware),
});

export default store; 