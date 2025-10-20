// src/pages/sender/SenderDashboard.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetMyParcelsQuery, useCancelParcelMutation } from "@/services/parcelApiSlice";


interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface IParcel {
  _id: string;
  trackingId: string;
  type: string;
  weight: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  receiverId: string | IUser;
  senderId: string | IUser;
}

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
  const { data: parcels = [], isLoading, isError } = useGetMyParcelsQuery(undefined);

  if (isLoading) return <div className="text-center mt-20">Loading parcels...</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Failed to load parcels.</div>;
  if (parcels.length === 0) return <div className="text-center mt-20">You have not created any parcels yet.</div>;

  const getUserName = (user: string | IUser) => (typeof user === "string" ? "Unknown" : user.name);


parcels?.map((parcel: IParcel) => (
  <Card key={parcel._id}>
    <h2>{parcel.trackingId}</h2>
    <p>{parcel.type}</p>
    <p>{typeof parcel.receiverId === "string" ? parcel.receiverId : parcel.receiverId.name}</p>
  </Card>
));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Created Parcels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <p><span className="font-medium">Receiver:</span> {getUserName(parcel.receiverId)}</p>
            <p><span className="font-medium">Pickup:</span> {parcel.pickupAddress}</p>
            <p><span className="font-medium">Delivery:</span> {parcel.deliveryAddress}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SenderDashboard;
