import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

export const ordersService = createApi({
  reducerPath: "ordersService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sort,
        search,
        status,
        paymentMethod,
        dateInterval,
        fromDate,
        toDate,
      } = {}) => {
        const params = new URLSearchParams();
        if (page) params.set("page", page);
        if (limit) params.set("limit", limit);
        if (sort) params.set("sort", sort);
        if (search) params.set("search", search);
        if (status) params.set("status", status);
        if (paymentMethod) params.set("paymentMethod", paymentMethod);
        if (dateInterval) params.set("dateInterval", dateInterval);
        if (fromDate) params.set("fromDate", fromDate);
        if (toDate) params.set("toDate", toDate);

        return {
          url: `${adminApiEndpoints.orders.base}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Order"],
      transformResponse: (response) => response,
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: adminApiEndpoints.orders.order(id),
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? {},
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status, reason }) => ({
        url: adminApiEndpoints.orders.status(id),
        method: "PATCH",
        body: { status, reason },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        "Order",
      ],
    }),

    exportOrders: builder.query({
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
          url: `${adminApiEndpoints.orders.export}?${params.toString()}`,
          method: "GET",
          responseHandler: (response) => response.blob(),
        };
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useLazyExportOrdersQuery,
} = ordersService;
