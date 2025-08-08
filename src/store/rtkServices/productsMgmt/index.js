import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";

export const productService = createApi({
  reducerPath: "productService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // GET /products
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
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
      transformResponse: (response) => response,
    }),

    // GET /products/:id
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // POST /products
    createProduct: builder.mutation({
      query: (formData) => {
        console.log("Creating product with payload:", formData);
        return {
          url: `/products`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // PUT /products/:id
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    // DELETE /products/:id
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // PATCH /products/:id/toggle-status
    toggleProductStatus: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        "Product",
      ],
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
} = productService;
