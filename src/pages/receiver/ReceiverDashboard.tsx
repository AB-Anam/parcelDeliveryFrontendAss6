// src/pages/receiver/ReceiverDashboard.tsx
import React from "react";
import { useGetMyParcelsQuery } from "@/services/parcelApiSlice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusColorMap: Record<string, string> = {
  Requested: "bg-yellow-100 text-yellow-800",
  Approved: "bg-blue-100 text-blue-800",
  Dispatched: "bg-purple-100 text-purple-800",
  "In Transit": "bg-orange-100 text-orange-800",
  Delivered: "bg-green-100 text-green-800",
  Canceled: "bg-red-100 text-red-800",
  Blocked: "bg-gray-100 text-gray-800",
};

export const ReceiverDashboard: React.FC = () => {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();

  if (isLoading) return <div className="text-center mt-20">Loading parcels...</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Failed to load parcels.</div>;
  if (!parcels || parcels.length === 0) return <div className="text-center mt-20">No parcels assigned to you.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Parcels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parcels.map((parcel) => (
          <Card key={parcel._id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{parcel.trackingId}</h2>
              <Badge className={cn(statusColorMap[parcel.status] || "bg-gray-100 text-gray-800")}>
                {parcel.status}
              </Badge>
            </div>
            <p><span className="font-medium">Type:</span> {parcel.type}</p>
            <p><span className="font-medium">Weight:</span> {parcel.weight} kg</p>
            <p><span className="font-medium">Pickup:</span> {parcel.pickupAddress}</p>
            <p><span className="font-medium">Delivery:</span> {parcel.deliveryAddress}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReceiverDashboard;
