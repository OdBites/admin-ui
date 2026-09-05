import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";
import { adminApiEndpoints } from "../../../api/adminEndpoints";

export const inquiriesService = createApi({
  reducerPath: "inquiriesService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["ContactInquiry"],
  endpoints: (builder) => ({
    fetchContactInquiries: builder.query({
      query: ({ page = 1, limit = 10, status, search } = {}) => {
        const params = new URLSearchParams();
        if (page) params.set("page", page);
        if (limit) params.set("limit", limit);
        if (status && status !== "all") params.set("status", status);
        if (search) params.set("search", search);

        return {
          url: `${adminApiEndpoints.contact.base}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["ContactInquiry"],
    }),
    getInquiryById: builder.query({
      query: (id) => ({
        url: adminApiEndpoints.contact.inquiry(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ContactInquiry", id }],
    }),
    updateInquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: adminApiEndpoints.contact.status(id),
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["ContactInquiry"],
    }),
    addAdminNote: builder.mutation({
      query: ({ id, note }) => ({
        url: adminApiEndpoints.contact.notes(id),
        method: "POST",
        body: { note },
      }),
      invalidatesTags: ["ContactInquiry"],
    }),
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: adminApiEndpoints.contact.inquiry(id),
        method: "DELETE",
      }),
      invalidatesTags: ["ContactInquiry"],
    }),
  }),
});

export const {
  useFetchContactInquiriesQuery,
  useGetInquiryByIdQuery,
  useUpdateInquiryStatusMutation,
  useAddAdminNoteMutation,
  useDeleteInquiryMutation,
} = inquiriesService;
