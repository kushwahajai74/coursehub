import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
  courses: [],
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
const getAllCourse = createAsyncThunk(
  "admin/getAllCourse",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.get(`/courses`);
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
const deleteCourse = createAsyncThunk(
  "admin/deleteCourse",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/courses/${id}`);
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
const addLectures = createAsyncThunk(
  "admin/addLectures",
  async (params, thunkAPI) => {
    try {
      const { formData, courseId } = params;
      const { data } = await axios.post(`/courses/${courseId}`, formData, {
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
      })
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
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addLectures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLectures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(addLectures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export { createCourse, getAllCourse, deleteCourse, addLectures };

export const { clearError, clearMessage } = adminSlice.actions;

export default adminSlice.reducer;
