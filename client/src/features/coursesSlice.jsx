import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  courses: [],
  isLoading: false,
  error: null,
  message: null,
};
const getAllCourse = createAsyncThunk(
  "courses/getAllCourse",
  async (params, thunkAPI) => {
    const { keyword, category } = params;
    try {
      const { data } = await axios.get(
        `/courses?keyword=${keyword}&category=${category}`
      );
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

const addToPlaylist = createAsyncThunk(
  "courses/addToPlaylist",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `/addtoplaylist`,
        { id },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
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

const coursesSlice = createSlice({
  name: "courses",
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
      .addCase(getAllCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.courses;
      })
      .addCase(getAllCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(addToPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export { getAllCourse, addToPlaylist };

export const { clearError, clearMessage } = coursesSlice.actions;

export default coursesSlice.reducer;
