// src/services/userApi.ts
import { apiSlice } from "./apiSlice";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  blocked: boolean;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({ // void = no argument needed
      query: () => "/users",
      providesTags: ["User"],
    }),
    getBlockedUsers: builder.query<User[], void>({
      query: () => "/users/blocked",
      providesTags: ["User"],
    }),
    blockUser: builder.mutation<User, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        body: { blocked },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetBlockedUsersQuery, useBlockUserMutation } = userApi;
