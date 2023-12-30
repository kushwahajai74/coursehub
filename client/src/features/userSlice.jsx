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
        withCredentials: "true",
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data ? error.response.data : error.message
    );
  }
});

const register = createAsyncThunk(
  "user/register",
  async (formdata, thunkAPI) => {
    try {
      const { data } = await axios.post("/register", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data ? error.response.data : error.message
      );
    }
  }
);

const getMyProfile = createAsyncThunk(
  "user/getUserData",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.get("/me", {
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
const logout = createAsyncThunk("user/logout", async (params, thunkAPI) => {
  try {
    const { data } = await axios.get("/logout", { withCredentials: "true" });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data ? error.response.data : error.message
    );
  }
});
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
    console.log(params);
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
const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async (formdata, thunkAPI) => {
    try {
      const { data } = await axios.put("/updateProfile", formdata, {
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
      })
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message;
      })
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
      });
  },
});

export {
  login,
  getMyProfile,
  logout,
  register,
  updateProfile,
  changePassword,
  updateProfilePicture,
};
export const { clearError, clearMessage } = userSlice.actions;

export default userSlice.reducer;
