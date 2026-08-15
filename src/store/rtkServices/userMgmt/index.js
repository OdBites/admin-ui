import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        status,
        orders,
        dateInterval,
        sort,
        search,
        createdBy,
        fromDate,
        toDate,
      } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (status) params.append("status", status);
        if (orders) params.append("orders", orders);
        if (dateInterval) params.append("dateInterval", dateInterval);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (createdBy) params.append("createdBy", createdBy);
        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);

        return {
          url: `${adminApiEndpoints.users}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
      transformResponse: (response) => response,
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: adminApiEndpoints.user(id),
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? {},
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation({
      query: (payload) => ({
        url: adminApiEndpoints.users,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: adminApiEndpoints.user(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    toggleUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: adminApiEndpoints.userStatus(id),
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: adminApiEndpoints.user(id),
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateProfilePicture: builder.mutation({
      query: ({ id, formData }) => ({
        url: adminApiEndpoints.userProfilePicture(id),
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    getProfilePicture: builder.query({
      query: (id) => ({
        url: adminApiEndpoints.userProfilePicture(id),
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? {},
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    exportUsers: builder.query({
      query: ({
        status,
        orders,
        dateInterval,
        sort,
        search,
        createdBy,
        fromDate,
        toDate,
      } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (orders) params.append("orders", orders);
        if (dateInterval) params.append("dateInterval", dateInterval);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (createdBy) params.append("createdBy", createdBy);
        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);

        return {
          url: `${adminApiEndpoints.users}/export?${params.toString()}`,
          method: "GET",
          responseHandler: (response) => response.blob(),
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useToggleUserStatusMutation,
  useDeleteUserMutation,
  useUpdateProfilePictureMutation,
  useGetProfilePictureQuery,
  useLazyExportUsersQuery,
} = userService;
