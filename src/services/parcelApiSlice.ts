// src/services/parcelApiSlice.ts
import { apiSlice } from "./apiSlice";

export const parcelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* -----------------------------------------
       📬 SENDER
    ------------------------------------------ */

    // Get parcels for logged-in user (sender OR receiver)
    getMyParcels: builder.query<any, void>({
      query: () => "/parcels/me",
      providesTags: ["Parcel"],
    }),

    // Create parcel
    createParcel: builder.mutation<any, any>({
      query: (parcel) => ({
        url: "/parcels",
        method: "POST",
        body: parcel,
      }),
      invalidatesTags: ["Parcel"],
    }),

    // Assign receiver (deliver request)
    deliverParcel: builder.mutation<any, { parcelId: string; receiverId: string }>({
      query: (data) => ({
        url: "/parcels/deliver",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Parcel"],
    }),

    // Cancel parcel
    cancelParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcels/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    /* -----------------------------------------
       📥 RECEIVER
    ------------------------------------------ */

    // Receiver confirms delivery
    confirmDelivery: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcels/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    /* -----------------------------------------
       👑 ADMIN
    ------------------------------------------ */

    // Admin: get ALL parcels
    getAllParcels: builder.query<any, void>({
      query: () => "/parcels",
      providesTags: ["Parcel"],
    }),

    // Admin: update parcel status
    updateParcelStatus: builder.mutation<
      any,
      { id: string; status: string; note?: string }
    >({
      query: ({ id, status, note }) => ({
        url: `/parcels/status/${id}`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: ["Parcel"],
    }),

    // Admin: block or unblock parcel
    toggleParcelBlock: builder.mutation<any, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({
        url: `/parcels/block/${id}`,
        method: "PATCH",
        body: { blocked },
      }),
      invalidatesTags: ["Parcel"],
    }),

    /* -----------------------------------------
       🌍 PUBLIC
    ------------------------------------------ */

    trackParcel: builder.query<any, string>({
      query: (trackingId) => `/parcels/track/${trackingId}`,
    }),

    /* -----------------------------------------
       📜 HISTORY
    ------------------------------------------ */

    getParcelHistory: builder.query<any, string>({
      query: (id) => `/parcels/history/${id}`,
    }),
  }),
});

export const {
  useGetMyParcelsQuery,
  useCreateParcelMutation,
  useDeliverParcelMutation,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useToggleParcelBlockMutation,
  useTrackParcelQuery,
  useGetParcelHistoryQuery,
} = parcelApiSlice;
