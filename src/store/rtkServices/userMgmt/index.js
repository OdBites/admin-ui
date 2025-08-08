import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // ✅ GET /api/users
    getUsers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        status,
        orders,
        dateInterval,
        sort,
        search,
      } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (status) params.append("status", status);
        if (orders) params.append("orders", orders);
        if (dateInterval) params.append("dateInterval", dateInterval);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        return {
          url: `/users?${params.toString()}`,
          method: "GET",
        };
      },

      providesTags: ["User"],
      transformResponse: (response) => response,
    }),

    // ✅ GET /api/users/:id
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // ✅ PUT /api/users/:id
    updateUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // ✅ PATCH /api/users/:id/status
    toggleUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // ✅ PATCH /api/users/:id/profile-picture (multipart/form-data)
    updateProfilePicture: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}/profile-picture`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // ✅ GET /api/users/:id/profile-picture (returns image)
    getProfilePicture: builder.query({
      query: (id) => ({
        url: `/users/${id}/profile-picture`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useToggleUserStatusMutation,
  useUpdateProfilePictureMutation,
  useGetProfilePictureQuery,
} = userService;
