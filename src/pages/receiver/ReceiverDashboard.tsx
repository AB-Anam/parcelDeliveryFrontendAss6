// src/pages/receiver/ReceiverDashboard.tsx
import React from "react";
import { IParcel } from "@/types/parcel";
import { useGetMyParcelsQuery, useConfirmDeliveryMutation } from "@/services/parcelApiSlice";

const ReceiverDashboard: React.FC = () => {
  const { data: parcels = [], isLoading, isError } = useGetMyParcelsQuery();
  const [confirmDelivery] = useConfirmDeliveryMutation();

  const handleConfirm = async (parcelId: string) => {
    try {
      await confirmDelivery(parcelId).unwrap();
      alert("Parcel confirmed delivered!");
    } catch (err: any) {
      console.error(err);
      alert(err?.data?.message || "Error confirming delivery");
    }
  };

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error loading parcels.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Parcels Assigned to Me</h1>
      {parcels.length === 0 ? (
        <p>No parcels yet.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Tracking ID</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel: IParcel) => (
              <tr key={parcel._id}>
                <td className="p-2 border">{parcel.trackingId}</td>
                <td className="p-2 border">{parcel.type}</td>
                <td className="p-2 border">{parcel.status}</td>
                <td className="p-2 border">
                  {parcel.status === "On the Way" && parcel._id && (
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleConfirm(parcel._id!)}
                    >
                      Confirm Delivery
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReceiverDashboard;
