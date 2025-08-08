import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    adminSignIn: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),

    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passwordData,
      }),
    }),
  }),
});

export const { useAdminSignInMutation, useChangePasswordMutation } =
  authService;
