// src/services/dashboardApiSlice.ts
import { apiSlice } from "./apiSlice";
import { IParcel } from "@/types/parcel";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* -----------------------------------------
       🧑‍💼 ADMIN: Get parcels awaiting approval
    ------------------------------------------ */
    getAdminApproval: builder.query<IParcel[], void>({
      query: () => "/parcels/me?status=Pending", // your backend should filter by status
      providesTags: ["Parcel"],
    }),

    /* -----------------------------------------
       👑 ADMIN: Update parcel status
    ------------------------------------------ */
    updateParcelStatus: builder.mutation<
      IParcel,
      { id: string; status: string; note?: string }
    >({
      query: ({ id, status, note }) => ({
        url: `/parcels/status/${id}`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: ["Parcel"],
    }),

    /* -----------------------------------------
       👑 ADMIN: Block / unblock parcel
    ------------------------------------------ */
    toggleParcelBlock: builder.mutation<IParcel, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({
        url: `/parcels/block/${id}`,
        method: "PATCH",
        body: { blocked },
      }),
      invalidatesTags: ["Parcel"],
    }),

    /* -----------------------------------------
       📬 SENDER DASHBOARD (optional)
    ------------------------------------------ */
    getSenderDashboard: builder.query<IParcel[], void>({
      query: () => "/parcels/me",
      providesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetAdminApprovalQuery,
  useUpdateParcelStatusMutation,
  useToggleParcelBlockMutation,
  useGetSenderDashboardQuery,
} = dashboardApiSlice;
