import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
};

const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (params, thunkAPI) => {
    const { name, email } = params;
    try {
      const { data } = await axios.put(
        "/updateProfile",
        { name, email },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: "true",
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data ? error.response.data : error.message
      );
    }
  }
);
const changePassword = createAsyncThunk(
  "user/changePassword",
  async (params, thunkAPI) => {
    const { oldPassword, newPassword, confirmPassword } = params;
    try {
      const { data } = await axios.put(
        "/changepassword",
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: "true",
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data ? error.response.data : error.message
      );
    }
  }
);
const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (email, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/forgetpassword",
        { email },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data ? error.response.data : error.message
      );
    }
  }
);
const updateProfilePicture = createAsyncThunk(
  "user/forgetPasswprd",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.put("/updateprofilepicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: "true",
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data ? error.response.data : error.message
      );
    }
  }
);
const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (params, thunkAPI) => {
    const { password, confirmPassword, token } = params;
    try {
      const { data } = await axios.put(
        `/resetpassword/${token}`,
        { password, confirmPassword },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: "true",
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data ? error.response.data : error.message
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
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
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export {
  updateProfile,
  changePassword,
  updateProfilePicture,
  forgetPassword,
  resetPassword,
};
export const { clearError, clearMessage } = profileSlice.actions;

export default profileSlice.reducer;
