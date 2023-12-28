import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  message: null,
};

const login = createAsyncThunk("user/login", async (params, thunkAPI) => {
  try {
    const { email, password } = params;
    const { data } = await axios.post(
      "/login",
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message;
      });
  },
});

export { login };
export const { clearError, clearMessage } = userSlice.actions;

export default userSlice.reducer;
