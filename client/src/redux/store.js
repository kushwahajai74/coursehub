import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";
import courseReducer from "../features/coursesSlice";
import paymentReducer from "../features/paymentSlice";
import adminReducer from "../features/adminSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    courses: courseReducer,
    payment: paymentReducer,
    admin: adminReducer,
  },
});

export default store;
