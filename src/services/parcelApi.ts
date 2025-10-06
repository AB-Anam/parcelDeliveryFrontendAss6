// src/services/parcelApi.ts
import { apiSlice } from "./apiSlice";

// Define types for parcels (adjust fields according to your backend)
export interface Parcel {
  id: string;
  name: string;
  sender: string;
  receiver: string;
  status: string;
  trackingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParcelInput {
  name: string;
  sender: string;
  receiver: string;
  // add other fields your API expects
}

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all parcels
    getAllParcels: builder.query<Parcel[], void>({
      query: () => "/parcels",
      transformResponse: (response: { success: boolean; parcels: Parcel[] }) =>
        response.parcels,
      providesTags: ["Parcel"],
    }),

    // Create a new parcel
    createParcel: builder.mutation<Parcel, CreateParcelInput>({
      query: (data) => ({
        url: "/parcels",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Parcel"],
    }),

    // Fetch parcels belonging to the current user
    getMyParcels: builder.query<Parcel[], void>({
      query: () => "/parcels/me",
      transformResponse: (response: { success: boolean; parcels: Parcel[] }) =>
        response.parcels,
      providesTags: ["Parcel"],
    }),

    // Cancel a parcel by ID
    cancelParcel: builder.mutation<Parcel, string>({
      query: (id) => ({
        url: `/parcels/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    // Confirm parcel delivery by ID
    confirmDelivery: builder.mutation<Parcel, string>({
      query: (id) => ({
        url: `/parcels/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    // Track a parcel by tracking ID
    trackParcel: builder.query<Parcel, string>({
      query: (trackingId) => `/parcels/track/${trackingId}`,
      transformResponse: (response: { success: boolean; parcel: Parcel }) =>
        response.parcel,
      providesTags: ["Parcel"],
    }),
  }),
});

// Export all auto-generated hooks
export const {
  useGetAllParcelsQuery,
  useCreateParcelMutation,
  useGetMyParcelsQuery,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useTrackParcelQuery,
} = parcelApi;
