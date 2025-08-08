import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";

export const paymentsService = createApi({
  reducerPath: "paymentsService",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sort,
        search,
        status,
        method,
        dateInterval,
        fromDate,
        toDate,
      } = {}) => {
        const params = new URLSearchParams();

        // Append all params if they exist
        if (page) params.set("page", page);
        if (limit) params.set("limit", limit);
        if (sort) params.set("sort", sort);
        if (search) params.set("search", search);
        if (status) params.set("status", status);
        if (method) params.set("method", method);
        if (dateInterval) params.set("dateInterval", dateInterval);
        if (fromDate) params.set("fromDate", fromDate);
        if (toDate) params.set("toDate", toDate);

        return {
          url: `/payments?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
    }),

    getPaymentById: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? {},
    }),
  }),
});

export const { useGetPaymentsQuery, useGetPaymentByIdQuery } = paymentsService;
