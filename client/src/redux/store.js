import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
