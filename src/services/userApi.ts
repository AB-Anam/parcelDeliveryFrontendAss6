// src/services/userApi.ts
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getBlockedUsers: builder.query({
      query: () => "/users/blocked",
      providesTags: ["User"],
    }),
    blockUser: builder.mutation({
      query: ({ id, blocked }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        body: { blocked },
      }),
      invalidatesTags: ["User"],
    }),
    getSenders: builder.query({
      query: () => "/users/senders",
    }),
    getReceivers: builder.query({
      query: () => "/users/receivers",
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetBlockedUsersQuery,
  useBlockUserMutation,
  useGetSendersQuery,
  useGetReceiversQuery,
} = userApi;
