import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

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
        paymentMethod,
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
        if (method || paymentMethod) {
          params.set("paymentMethod", method || paymentMethod);
        }
        if (dateInterval) params.set("dateInterval", dateInterval);
        if (fromDate) params.set("fromDate", fromDate);
        if (toDate) params.set("toDate", toDate);

        return {
          url: `${adminApiEndpoints.payments}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
    }),

    getPaymentById: builder.query({
      query: (id) => ({
        url: adminApiEndpoints.payment(id),
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? {},
    }),

    exportPayments: builder.query({
      query: ({
        sort,
        search,
        status,
        paymentMethod,
        dateInterval,
        fromDate,
        toDate,
      } = {}) => {
        const params = new URLSearchParams();
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (paymentMethod) params.append("paymentMethod", paymentMethod);
        if (dateInterval) params.append("dateInterval", dateInterval);
        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);
        return {
          url: `${adminApiEndpoints.payments}/export?${params.toString()}`,
          method: "GET",
          responseHandler: (response) => response.blob(),
        };
      },
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useLazyExportPaymentsQuery,
} = paymentsService;
