import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};
const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    storeDashboardData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storeDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
