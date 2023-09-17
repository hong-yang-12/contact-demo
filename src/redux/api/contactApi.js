import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1/",
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: ({ token, current_page }) => ({
        url: `/contact?pageSize=10&page=${current_page}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ token, contact }) => ({
        url: `/contact`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: contact,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    getSingleContact: builder.query({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: `/user-profile`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    editContact: builder.mutation({
      query: ({ id, token, contact }) => ({
        url: `/contact/${id}`,
        method: "PATCH",
        headers: { authorization: `Bearer ${token}` },
        body: contact,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});
export const {
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetSingleContactQuery,
  useGetProfileQuery,
  useEditContactMutation,
} = contactApi;
