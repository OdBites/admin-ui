import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";

export const supportService = createApi({
  reducerPath: "supportService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["SupportSession", "ChatMessage"],
  endpoints: (builder) => ({
    fetchSupportSessions: builder.query({
      query: () => ({
        url: "/admin/support/chats",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["SupportSession"],
    }),
    fetchChatMessages: builder.query({
      query: (customerId) => ({
        url: `/admin/support/chats/${customerId}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      providesTags: ["ChatMessage"],
    }),
    sendMessage: builder.mutation({
      query: ({ customerId, message }) => ({
        url: `/admin/support/chats/${customerId}`,
        method: "POST",
        body: { message },
      }),
    }),
    resolveSession: builder.mutation({
      query: (customerId) => ({
        url: `/admin/support/chats/${customerId}/resolve`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useFetchSupportSessionsQuery,
  useFetchChatMessagesQuery,
  useSendMessageMutation,
  useResolveSessionMutation,
} = supportService;
