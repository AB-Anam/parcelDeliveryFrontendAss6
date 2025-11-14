import { useGetMyParcelsQuery, useConfirmDeliveryMutation } from "@/services/apiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReceiverDashboard() {
  const { data, isLoading } = useGetMyParcelsQuery();
  const [confirmDelivery] = useConfirmDeliveryMutation();

  const parcels = Array.isArray(data) ? data : [];

  const handleConfirm = (parcelId: string) => {
    confirmDelivery(parcelId);
  };

  if (isLoading) return <p className="text-center py-6">Loading parcels...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📦 Parcels Assigned to Me</h1>
      {parcels.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No parcels assigned yet.</p>
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

                {parcel.status === "In Transit" && parcel._id && (
                  <Button
                    onClick={() => handleConfirm(parcel._id!)}
                    className="bg-green-600 hover:bg-green-700 text-white mt-2"
                  >
                    ✅ Confirm Delivery
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
