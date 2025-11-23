import React from "react";
import { IParcel } from "@/types/parcel";
import {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
} from "@/services/parcelApiSlice";

const AdminApprovalPage: React.FC = () => {
  // Fetch all parcels
  const { data: parcels = [], isLoading, isError } = useGetAllParcelsQuery();

  // Mutation to approve/reject parcels
  const [updateParcelStatus] = useUpdateParcelStatusMutation();

  const handleApprove = async (parcelId: string) => {
    try {
      await updateParcelStatus({ id: parcelId, status: "On the Way" }).unwrap();
      alert("Parcel approved!");
    } catch (err: any) {
      console.error(err);
      alert(err?.data?.message || "Error updating parcel");
    }
  };

  const handleReject = async (parcelId: string) => {
    try {
      await updateParcelStatus({ id: parcelId, status: "Rejected" }).unwrap();
      alert("Parcel rejected!");
    } catch (err: any) {
      console.error(err);
      alert(err?.data?.message || "Error updating parcel");
    }
  };

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error loading parcels.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Parcel Approvals</h1>
      {parcels.length === 0 ? (
        <p>No parcels available for approval.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Tracking ID</th>
              <th className="p-2 border">Sender</th>
              <th className="p-2 border">Receiver</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel: IParcel) => (
              <tr key={parcel._id}>
                <td className="p-2 border">{parcel.trackingId}</td>
                <td className="p-2 border">{parcel.senderId}</td>
                <td className="p-2 border">{parcel.receiverId || "Not assigned"}</td>
                <td className="p-2 border">{parcel.status}</td>
                <td className="p-2 border space-x-2">
                  {parcel.status === "Pending" && parcel._id && (
                    <>
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        onClick={() => handleApprove(parcel._id!)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleReject(parcel._id!)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {parcel.status !== "Pending" && <span>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminApprovalPage;
