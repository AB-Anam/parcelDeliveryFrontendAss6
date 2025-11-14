import { useGetAllParcelsQuery, useUpdateParcelStatusMutation } from "@/services/apiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminApprovalPage() {
  const { data, isLoading } = useGetAllParcelsQuery();
  const [updateStatus] = useUpdateParcelStatusMutation();

  const parcels = Array.isArray(data) ? data : [];

  const handleApprove = (parcelId: string) => {
    updateStatus({ id: parcelId, status: "Dispatched" });
  };

  const handleReject = (parcelId: string) => {
    updateStatus({ id: parcelId, status: "Canceled" });
  };

  if (isLoading) return <p className="text-center py-6">Loading parcels...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📦 Pending Parcels for Approval</h1>
      {parcels.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No parcels pending approval.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcels
            .filter((p) => p.status === "Pending")
            .map((parcel) => (
              <Card key={parcel._id ?? parcel.trackingId} className="shadow-md">
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold">
                    Tracking ID: {parcel.trackingId}
                  </h2>
                  <p>Type: {parcel.type}</p>
                  <p>Weight: {parcel.weight} kg</p>
                  <p>Pickup: {parcel.pickupAddress}</p>
                  <p>Delivery: {parcel.deliveryAddress}</p>

                  {parcel._id && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => handleApprove(parcel._id!)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        ✅ Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(parcel._id!)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        ❌ Reject
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
