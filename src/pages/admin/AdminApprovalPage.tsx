// src/pages/AdminApproval.tsx
import React from "react";
import { useGetAllParcelsQuery, useApproveParcelMutation } from "@/services/parcelApiSlice";
import { IParcel } from "@/types/parcel";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function AdminApproval() {
  const { data: parcels, isLoading } = useGetAllParcelsQuery();
  const [approveParcel] = useApproveParcelMutation();

  if (isLoading) return <p className="text-center py-6">Loading parcels...</p>;

  const pendingParcels = parcels?.filter((p) => p.status === "Pending") || [];

  const handleApprove = async (parcel: IParcel) => {
    try {
      await approveParcel({ id: parcel._id!, status: "Dispatched" }).unwrap();
      toast.success("Parcel approved and dispatched!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve parcel");
    }
  };

  if (pendingParcels.length === 0)
    return <p className="text-center py-6 text-gray-500">No parcels pending approval.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Approval - Pending Parcels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingParcels.map((parcel) => (
          <div key={parcel._id} className="border rounded p-4 shadow-md space-y-2">
            <h2 className="font-semibold">Tracking ID: {parcel.trackingId}</h2>
            <p>Type: {parcel.type}</p>
            <p>Weight: {parcel.weight} kg</p>
            <p>Pickup: {parcel.pickupAddress}</p>
            <p>Delivery: {parcel.deliveryAddress}</p>
            <p>Sender: {parcel.senderId}</p>
            <p>Receiver: {parcel.receiverId}</p>
            <p>Status: <strong>{parcel.status}</strong></p>
            <Button
              onClick={() => handleApprove(parcel)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              ✅ Approve & Dispatch
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
