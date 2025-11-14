// src/pages/SenderDashboard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyParcelsQuery, useDeliverParcelMutation } from "@/services/parcelApiSlice";
import { useGetUsersQuery } from "@/services/apiSlice";
import { IParcel } from "@/types/parcel";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function SenderDashboard() {
  const navigate = useNavigate();
  const { data } = useGetMyParcelsQuery();
  const { data: receivers } = useGetUsersQuery();
  const [deliverParcel] = useDeliverParcelMutation();

  const parcels: IParcel[] = data ?? [];

  const [selectedParcel, setSelectedParcel] = useState<IParcel | null>(null);
  const [selectedReceiver, setSelectedReceiver] = useState<string>("");

  const openDeliverModal = (parcel: IParcel) => {
    setSelectedParcel(parcel);
    setSelectedReceiver("");
  };

  const handleDeliver = async () => {
    if (!selectedParcel || !selectedReceiver) return;
    try {
      await deliverParcel({
        parcelId: selectedParcel._id!,
        receiverId: selectedReceiver,
      }).unwrap();
      toast.success("Parcel delivery initiated!");
      setSelectedParcel(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to deliver parcel");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 My Parcels</h1>
        <Button
          onClick={() => navigate("/sender/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          ➕ Create Parcel
        </Button>
      </div>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">You have no parcels.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcels.map((parcel) => (
            <div key={parcel._id} className="border rounded p-4 shadow-md space-y-2">
              <h2 className="font-semibold">Tracking ID: {parcel.trackingId}</h2>
              <p>Status: <strong>{parcel.status}</strong></p>
              <p>Type: {parcel.type}</p>
              <p>Weight: {parcel.weight} kg</p>
              <p>Pickup: {parcel.pickupAddress}</p>
              <p>Delivery: {parcel.deliveryAddress}</p>

              {parcel.status === "Requested" && (
                <Button
                  onClick={() => openDeliverModal(parcel)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  🚚 Deliver
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Simple Deliver Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Assign Receiver</h2>
            <select
              className="w-full border rounded p-2 mb-4"
              value={selectedReceiver}
              onChange={(e) => setSelectedReceiver(e.target.value)}
            >
              <option value="">Select a receiver</option>
              {receivers?.map((r: any) => (
                <option key={r._id} value={r._id}>
                  {r.name} ({r.email})
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setSelectedParcel(null)} className="bg-gray-400 hover:bg-gray-500">
                Cancel
              </Button>
              <Button onClick={handleDeliver} className="bg-green-600 hover:bg-green-700 text-white">
                ✅ Assign & Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
