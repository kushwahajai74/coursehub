import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
};

const createCourse = createAsyncThunk(
  "admin/createCourse",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post("/courses", formData, {
        withCredentials: "true",
        headers: {
          "Content-type": "content-type: multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const adminSlice = createSlice({
  initialState,
  name: "admin",
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
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export { createCourse };

export const { clearError, clearMessage } = adminSlice.actions;

export default adminSlice.reducer;
