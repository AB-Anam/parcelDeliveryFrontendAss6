// src/services/userApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/types/user";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    blockUser: builder.mutation<{ id: string; blocked: boolean }, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        body: { blocked },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// ✅ Correct exports
export const { useGetUsersQuery, useBlockUserMutation } = userApiSlice;
