import { useNavigate } from "react-router-dom";
import { useGetMyParcelsQuery } from "@/services/apiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SenderDashboard() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyParcelsQuery();

  // Ensure parcels is always an array
  const parcels = Array.isArray(data) ? data : [];

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
                <h2 className="text-lg font-semibold">
                  Tracking ID: {parcel.trackingId}
                </h2>
                <p>Status: <strong>{parcel.status}</strong></p>
                <p>Type: {parcel.type}</p>
                <p>Weight: {parcel.weight} kg</p>
                <p>Pickup: {parcel.pickupAddress}</p>
                <p>Delivery: {parcel.deliveryAddress}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
