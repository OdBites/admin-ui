import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";

export const dashboardService = createApi({
  reducerPath: "dashboardService",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    fetchDashboardData: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useFetchDashboardDataQuery } = dashboardService;
