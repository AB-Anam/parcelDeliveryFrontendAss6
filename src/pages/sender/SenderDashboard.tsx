// src/pages/SenderDashboard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useGetMyParcelsQuery, useDeliverParcelMutation } from "@/services/apiSlice";

export default function SenderDashboard() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetMyParcelsQuery();
  const [deliverParcel] = useDeliverParcelMutation();
  const [receiverInputs, setReceiverInputs] = useState<Record<string, string>>({});

  // Ensure parcels is always an array
  const parcels = Array.isArray(data) ? data : [];

  const handleReceiverChange = (parcelId: string, value: string) => {
    setReceiverInputs({ ...receiverInputs, [parcelId]: value });
  };

  const handleDeliver = async (parcelId: string) => {
    const receiverId = receiverInputs[parcelId];
    if (!receiverId) {
      toast.error("Please enter a receiver ID");
      return;
    }

    try {
      await deliverParcel({ parcelId, receiverId }).unwrap();
      toast.success("🚚 Parcel assigned to receiver!");
      setReceiverInputs({ ...receiverInputs, [parcelId]: "" });
      refetch(); // Refresh parcel list
    } catch (err: any) {
      console.error("❌ Error delivering parcel:", err);
      toast.error(err?.data?.message || "Failed to deliver parcel");
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading parcels...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📦 My Parcels</h1>
        <Button
          onClick={() => navigate("/sender/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          ➕ Create Parcel
        </Button>
      </div>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You have not created any parcels yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcels.map((parcel) => (
            <Card key={parcel._id ?? parcel.trackingId} className="shadow-md">
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">Tracking ID: {parcel.trackingId}</h2>
                <p>Status: <strong>{parcel.status}</strong></p>
                <p>Type: {parcel.type}</p>
                <p>Weight: {parcel.weight} kg</p>
                <p>Pickup: {parcel.pickupAddress}</p>
                <p>Delivery: {parcel.deliveryAddress}</p>
                {parcel.receiverId ? (
                  <p>Receiver ID: {parcel.receiverId}</p>
                ) : (
                  <div className="space-y-2 mt-2">
                    <Input
                      placeholder="Enter Receiver ID"
                      value={receiverInputs[parcel._id ?? ""] || ""}
                      onChange={(e) => handleReceiverChange(parcel._id ?? "", e.target.value)}
                    />
                    <Button
                      onClick={() => handleDeliver(parcel._id ?? "")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      🚚 Deliver Parcel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
