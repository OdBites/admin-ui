import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    adminSignIn: builder.mutation({
      query: (user) => ({
        url: adminApiEndpoints.auth.login,
        method: "POST",
        body: user,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: adminApiEndpoints.auth.forgotPassword,
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload) => ({
        url: adminApiEndpoints.auth.resetPassword,
        method: "POST",
        body: payload,
      }),
    }),

    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: adminApiEndpoints.auth.changePassword,
        method: "POST",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useAdminSignInMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authService;
