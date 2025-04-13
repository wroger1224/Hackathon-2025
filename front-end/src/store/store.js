import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import userProfileReducer from "../reducers/userProfileSlice";
import adminReducer from "../reducers/adminSlice";
import communityReducer from "../reducers/communitySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        userProfile: userProfileReducer,
        admin: adminReducer,
        community: communityReducer,
    },
})

export default store;