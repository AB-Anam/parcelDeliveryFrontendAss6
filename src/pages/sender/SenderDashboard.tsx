// src/pages/sender/SenderDashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useGetMyParcelsQuery } from "@/services/apiSlice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IParcel } from "@/types/parcel";

// Map parcel status to colors
const statusColorMap: Record<string, string> = {
  Requested: "bg-yellow-100 text-yellow-800",
  Approved: "bg-blue-100 text-blue-800",
  Dispatched: "bg-purple-100 text-purple-800",
  "In Transit": "bg-orange-100 text-orange-800",
  Delivered: "bg-green-100 text-green-800",
  Canceled: "bg-red-100 text-red-800",
  Blocked: "bg-gray-100 text-gray-800",
};

export const SenderDashboard: React.FC = () => {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();

  if (isLoading) return <div className="text-center mt-20">Loading parcels...</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Failed to load parcels.</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Created Parcels</h1>
        <Link
          to="/sender/create"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          + Create Parcel
        </Link>
      </div>

      {parcels && parcels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcels.map((parcel: IParcel) => (
            <Card key={parcel._id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{parcel.trackingId}</h2>
                <Badge className={cn(statusColorMap[parcel.status] || "bg-gray-100 text-gray-800")}>
                  {parcel.status}
                </Badge>
              </div>
              <p><span className="font-medium">Type:</span> {parcel.type}</p>
              <p><span className="font-medium">Weight:</span> {parcel.weight} kg</p>
              <p>
                <span className="font-medium">Receiver:</span>{" "}
                {typeof parcel.receiverId === "string" ? parcel.receiverId : parcel.receiverId.name}
              </p>
              <p><span className="font-medium">Pickup:</span> {parcel.pickupAddress}</p>
              <p><span className="font-medium">Delivery:</span> {parcel.deliveryAddress}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-700">
          You have not created any parcels yet.
        </div>
      )}
    </div>
  );
};

export default SenderDashboard;
