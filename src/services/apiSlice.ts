// RTK Query + axios baseQuery wrapper
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../api/axiosBase";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }: any) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Parcels", "Users"],
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: (data) => ({ url: "/api/auth/login", method: "POST", data }),
    }),
    register: builder.mutation<any, { name: string; email: string; password: string; role: string }>({
      query: (data) => ({ url: "/api/auth/register", method: "POST", data }),
    }),
    getMyParcels: builder.query<any[], void>({
      query: () => ({ url: "/api/parcels/me", method: "GET" }),
      providesTags: ["Parcels"],
    }),
    getAllParcels: builder.query<any[], void>({
      query: () => ({ url: "/api/parcels", method: "GET" }),
      providesTags: ["Parcels"],
    }),
    createParcel: builder.mutation<any, any>({
      query: (parcel) => ({ url: "/api/parcels", method: "POST", data: parcel }),
      invalidatesTags: ["Parcels"],
    }),
    getUsers: builder.query<any[], void>({
      query: () => ({ url: "/api/users", method: "GET" }),
      providesTags: ["Users"],
    }),
    blockUser: builder.mutation<any, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({ url: `/api/users/block/${id}`, method: "PATCH", data: { blocked } }),
      invalidatesTags: ["Users"],
    }),
    trackParcel: builder.query<any, string>({
      query: (trackingId) => ({ url: `/api/parcels/track/${trackingId}`, method: "GET" }),
    }),
    cancelParcel: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({ url: `/api/parcels/cancel/${id}`, method: "PATCH" }),
      invalidatesTags: ["Parcels"],
    }),
    confirmDelivery: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({ url: `/api/parcels/confirm/${id}`, method: "PATCH" }),
      invalidatesTags: ["Parcels"],
    }),
    updateParcelStatus: builder.mutation<any, { id: string; status: string; note?: string }>({
      query: ({ id, status, note }) => ({ url: `/api/parcels/status/${id}`, method: "PATCH", data: { status, note } }),
      invalidatesTags: ["Parcels"],
    }),
    blockParcel: builder.mutation<any, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({ url: `/api/parcels/block/${id}`, method: "PATCH", data: { blocked } }),
      invalidatesTags: ["Parcels"],
    }),
    getParcelHistory: builder.query<any, string>({
      query: (id) => ({ url: `/api/parcels/history/${id}`, method: "GET" }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMyParcelsQuery,
  useGetAllParcelsQuery,
  useCreateParcelMutation,
  useGetUsersQuery,
  useBlockUserMutation,
  useTrackParcelQuery,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
  useGetParcelHistoryQuery,
} = apiSlice;
