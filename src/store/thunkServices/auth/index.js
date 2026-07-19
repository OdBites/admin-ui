import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosMain } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

export const adminSignInThunk = createAsyncThunk(
  "auth/adminSignIn",
  async ({ credentials, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const response = await axiosMain.post(
        adminApiEndpoints.auth.login,
        credentials
      );
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      onError(error || "Failed to fetch");
      return rejectWithValue(error || "Failed to fetch");
    }
  }
);
