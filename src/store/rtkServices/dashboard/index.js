import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

export const dashboardService = createApi({
  reducerPath: "dashboardService",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    fetchDashboardData: builder.query({
      query: (params) => ({
        url: adminApiEndpoints.dashboard.base,
        method: "GET",
        params: typeof params === "string" ? { timeframe: params } : params,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useFetchDashboardDataQuery } = dashboardService;
