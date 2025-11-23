// src/services/parcelApiSlice.ts
import { apiSlice } from "./apiSlice";
import { IParcel } from "@/types/parcel";

export const parcelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* -----------------------------------------
       📬 SENDER
    ------------------------------------------ */
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
      invalidatesTags: ["Parcel"], // triggers dashboard refresh
    }),

    deliverParcel: builder.mutation<IParcel, { parcelId: string; receiverId: string }>({
      query: (data) => ({
        url: "/parcels/deliver",
        method: "POST",
        body: data,
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

    /* -----------------------------------------
       📥 RECEIVER
    ------------------------------------------ */
    confirmDelivery: builder.mutation<IParcel, string>({
      query: (id) => ({
        url: `/parcels/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    /* -----------------------------------------
       👑 ADMIN
    ------------------------------------------ */
    getAllParcels: builder.query<IParcel[], void>({
      query: () => "/parcels",
      providesTags: ["Parcel"],
    }),

    updateParcelStatus: builder.mutation<IParcel, { id: string; status: string; note?: string }>({
      query: ({ id, status, note }) => ({
        url: `/parcels/status/${id}`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: ["Parcel"],
    }),

    toggleParcelBlock: builder.mutation<IParcel, { id: string; blocked: boolean }>({
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
    trackParcel: builder.query<IParcel, string>({
      query: (trackingId) => `/parcels/track/${trackingId}`,
    }),

    /* -----------------------------------------
       📜 HISTORY
    ------------------------------------------ */
    getParcelHistory: builder.query<IParcel, string>({
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
