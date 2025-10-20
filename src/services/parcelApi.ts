import { apiSlice } from "./apiSlice";

export interface Parcel {
  _id: string;
  type: string;
  weight: number;
  senderId: string;
  receiverId: string;
  pickupAddress: string;
  deliveryAddress: string;
  fee: number;
  status: string;
  trackingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParcelInput {
  type: string;
  weight: number;
  receiverId: string;
  pickupAddress: string;
  deliveryAddress: string;
  fee: number;
}

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllParcels: builder.query<Parcel[], void>({
      query: () => "/parcels",
      providesTags: ["Parcel"],
    }),
    getMyParcels: builder.query<Parcel[], void>({
      query: () => "/parcels/me",
      providesTags: ["Parcel"],
    }),
    createParcel: builder.mutation<Parcel, CreateParcelInput>({
      query: (body) => ({
        url: "/parcels",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetAllParcelsQuery,
  useGetMyParcelsQuery,
  useCreateParcelMutation,
} = parcelApi;
