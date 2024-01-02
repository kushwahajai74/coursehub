import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";
import courseReducer from "../features/coursesSlice";
import paymentReducer from "../features/paymentSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    courses: courseReducer,
    payment: paymentReducer,
  },
});

export default store;
