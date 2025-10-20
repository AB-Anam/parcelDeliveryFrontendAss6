import { apiSlice } from "./apiSlice";

export const parcelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyParcels: builder.query<any[], void>({
      query: () => "/parcels/me",
      providesTags: ["Parcel"],
    }),
    createParcel: builder.mutation<any, any>({
      query: (parcel) => ({
        url: "/parcels",
        method: "POST",
        body: parcel,
      }),
      invalidatesTags: ["Parcel"],
    }),
    cancelParcel: builder.mutation<any, string>({
      query: (id) => ({
        url: `/parcels/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),
    trackParcel: builder.query<any, string>({
      query: (trackingId) => `/parcels/track/${trackingId}`,
    }),
  }),
});

export const {
  useGetMyParcelsQuery,
  useCreateParcelMutation,
  useCancelParcelMutation,
  useTrackParcelQuery,
} = parcelApiSlice;
