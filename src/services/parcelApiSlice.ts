// src/services/parcelApiSlice.ts
import { apiSlice } from "./apiSlice";
import { IParcel } from "@/types/parcel";

export const parcelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ===== Sender =====
    getMyParcels: builder.query<IParcel[], void>({
      query: () => "/parcels/me",
      providesTags: ["Parcel"],
    }),
    createParcel: builder.mutation<IParcel, Partial<IParcel>>({
      query: (parcel) => ({
        url: "/parcels",
        method: "POST",
        body: parcel,
      }),
      invalidatesTags: ["Parcel"],
    }),
    cancelParcel: builder.mutation<IParcel, string>({
      query: (id) => ({
        url: `/parcels/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),
    deliverParcel: builder.mutation<IParcel, { parcelId: string; receiverId: string }>({
      query: ({ parcelId, receiverId }) => ({
        url: "/parcels/deliver",
        method: "PATCH",
        body: { parcelId, receiverId },
      }),
      invalidatesTags: ["Parcel"],
    }),

    // ===== Receiver =====
    confirmDelivery: builder.mutation<IParcel, string>({
      query: (parcelId) => ({
        url: `/parcels/confirm/${parcelId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    // ===== Admin =====
    approveParcel: builder.mutation<IParcel, { id: string; status: string; note?: string }>({
      query: ({ id, status, note }) => ({
        url: `/parcels/status/${id}`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: ["Parcel"],
    }),
    getAllParcels: builder.query<IParcel[], void>({
      query: () => "/parcels",
      providesTags: ["Parcel"],
    }),

    // ===== Public =====
    trackParcel: builder.query<IParcel, string>({
      query: (trackingId) => `/parcels/track/${trackingId}`,
    }),
  }),
});

export const {
  // Sender
  useGetMyParcelsQuery,
  useCreateParcelMutation,
  useCancelParcelMutation,
  useDeliverParcelMutation,

  // Receiver
  useConfirmDeliveryMutation,

  // Admin
  useApproveParcelMutation,
  useGetAllParcelsQuery,

  // Public
  useTrackParcelQuery,
} = parcelApiSlice;
