import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
  subscriptionId: null,
};

const buySubscription = createAsyncThunk(
  "payment/buySubscription",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.get("/subscribe");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data ? error.response.data : error.message
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
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
      .addCase(buySubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buySubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subscriptionId = action.payload.subscription.id;
      })
      .addCase(buySubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export { buySubscription };

export const { clearError, clearMessage } = paymentSlice.actions;
export default paymentSlice.reducer;
