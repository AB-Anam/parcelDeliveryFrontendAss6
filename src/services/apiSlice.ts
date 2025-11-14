// src/services/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/types/user";
import { IParcel } from "@/types/parcel";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Auth", "User", "Parcel"],
  endpoints: (builder) => ({
    // ===== Auth =====
    register: builder.mutation<{ user: IUser; token: string }, { name: string; email: string; password: string; role: "sender" | "receiver" | "admin" }>({
      query: (payload) => ({ url: "/auth/register", method: "POST", body: payload }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<{ success: boolean; token: { token: string; user: IUser } }, { email: string; password: string }>({
      query: (payload) => ({ url: "/auth/login", method: "POST", body: payload }),
      invalidatesTags: ["Auth"],
    }),

    // ===== User =====
    getUsers: builder.query<IUser[], void>({ query: () => "/users", providesTags: ["User"] }),
    blockUser: builder.mutation<IUser, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({ url: `/users/block/${id}`, method: "PATCH", body: { blocked } }),
      invalidatesTags: ["User"],
    }),
    getBlockedUsers: builder.query<IUser[], void>({ query: () => "/users/blocked", providesTags: ["User"] }),

    // ===== Parcel =====
    getMyParcels: builder.query<IParcel[], void>({
      query: () => "/parcels/me",
      providesTags: ["Parcel"],
    }),
    createParcel: builder.mutation<IParcel, Partial<IParcel>>({
      query: (parcel) => ({ url: "/parcels", method: "POST", body: parcel }),
      invalidatesTags: ["Parcel"],
    }),
    cancelParcel: builder.mutation<IParcel, string>({
      query: (id) => ({ url: `/parcels/cancel/${id}`, method: "PATCH" }),
      invalidatesTags: ["Parcel"],
    }),
    confirmDelivery: builder.mutation<IParcel, string>({
      query: (id) => ({ url: `/parcels/confirm/${id}`, method: "PATCH" }),
      invalidatesTags: ["Parcel"],
    }),
    deliverParcel: builder.mutation<IParcel, { parcelId: string; receiverId: string }>({
      query: (payload) => ({ url: `/parcels/deliver`, method: "PATCH", body: payload }),
      invalidatesTags: ["Parcel"],
    }),
    getParcelHistory: builder.query<IParcel, string>({ query: (id) => `/parcels/history/${id}`, providesTags: ["Parcel"] }),
    trackParcel: builder.query<IParcel, string>({ query: (trackingId) => `/parcels/track/${trackingId}`, providesTags: ["Parcel"] }),

    // ===== Admin Parcel Endpoints =====
    getAllParcels: builder.query<IParcel[], void>({
      query: () => "/parcels",
      providesTags: ["Parcel"],
    }),
    updateParcelStatus: builder.mutation<IParcel, { id: string; status: string; note?: string }>({
      query: ({ id, status, note }) => ({ url: `/parcels/status/${id}`, method: "PATCH", body: { status, note } }),
      invalidatesTags: ["Parcel"],
    }),
    blockParcel: builder.mutation<IParcel, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({ url: `/parcels/block/${id}`, method: "PATCH", body: { blocked } }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

// ===== Export hooks =====
export const {
  // Auth
  useRegisterMutation,
  useLoginMutation,
  // User
  useGetUsersQuery,
  useBlockUserMutation,
  useGetBlockedUsersQuery,
  // Parcel
  useGetMyParcelsQuery,
  useCreateParcelMutation,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useDeliverParcelMutation,
  useGetParcelHistoryQuery,
  useTrackParcelQuery,
  // Admin
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
} = apiSlice;
