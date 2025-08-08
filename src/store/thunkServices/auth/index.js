import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosMain } from "../../../api";

export const adminSignInThunk = createAsyncThunk(
  "auth/adminSignIn",
  async ({ credentials, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const response = await axiosMain.post("/auth/login", credentials);
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      onError(error || "Failed to fetch");
      return rejectWithValue(error || "Failed to fetch");
    }
  }
);
