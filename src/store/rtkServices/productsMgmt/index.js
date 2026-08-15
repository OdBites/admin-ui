import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

export const productService = createApi({
  reducerPath: "productService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // GET /api/admin/products
    getProducts: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sort,
        search,
        status,
        category,
        subCategory,
        dateInterval,
        fromDate,
        toDate,
      } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (category) params.append("category", category);
        if (subCategory) params.append("subCategory", subCategory);
        if (dateInterval) params.append("dateInterval", dateInterval);
        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);
        return {
          url: `${adminApiEndpoints.products}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
      transformResponse: (response) => response,
    }),

    // GET /api/admin/products/:id
    getProductById: builder.query({
      query: (id) => ({
        url: adminApiEndpoints.product(id),
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // POST /api/admin/products
    createProduct: builder.mutation({
      query: (formData) => {
        return {
          url: adminApiEndpoints.products,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // PUT /api/admin/products/:id
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: adminApiEndpoints.product(id),
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    // DELETE /api/admin/products/:id
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: adminApiEndpoints.product(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // PATCH /api/admin/products/:id/toggle-status
    toggleProductStatus: builder.mutation({
      query: (id) => ({
        url: adminApiEndpoints.productToggleStatus(id),
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    exportProducts: builder.query({
      query: ({
        sort,
        search,
        status,
        category,
        subCategory,
        dateInterval,
        fromDate,
        toDate,
      } = {}) => {
        const params = new URLSearchParams();
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (category) params.append("category", category);
        if (subCategory) params.append("subCategory", subCategory);
        if (dateInterval) params.append("dateInterval", dateInterval);
        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);
        return {
          url: `${adminApiEndpoints.products}/export?${params.toString()}`,
          method: "GET",
          responseHandler: (response) => response.blob(),
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useToggleProductStatusMutation,
  useLazyExportProductsQuery,
} = productService;
