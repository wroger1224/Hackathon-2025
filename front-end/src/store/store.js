import { configureStore } from "@reduxjs/toolkit";
import { userProfileApi } from "../services/userProfile/userProfile";
import userReducer from "../reducers/userSlice";


export const store = configureStore({
    reducer: {
        [userProfileApi.reducerPath]: userProfileApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userProfileApi.middleware),
})
