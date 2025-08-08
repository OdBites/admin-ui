import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../api";

export const profileService = createApi({
  reducerPath: "profileService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Profile", "Profile_Picture"],
  endpoints: (builder) => ({
    getProfileDetails: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? {},
      providesTags: ["Profile"],
    }),

    updateProfileDetails: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/profile/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      async onQueryStarted({ id, updatedData }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(profileService.util.invalidateTags(["Profile"]));
        } catch (err) {}
      },
    }),

    getProfilePhoto: builder.query({
      query: (id) => ({
        url: `/profile/${id}/photo`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data ?? {},
      providesTags: ["Profile_Picture"],
    }),

    updateProfilePhoto: builder.mutation({
      query: ({ id, imgData }) => ({
        url: `/profile/${id}/photo`,
        method: "PUT",
        body: imgData,
      }),
      async onQueryStarted({ id, imgData }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(profileService.util.invalidateTags(["Profile_Picture"]));
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetProfileDetailsQuery,
  useUpdateProfileDetailsMutation,
  useGetProfilePhotoQuery,
  useUpdateProfilePhotoMutation,
} = profileService;
