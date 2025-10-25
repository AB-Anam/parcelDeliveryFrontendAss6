// src/pages/public/TrackParcel.tsx
import { useState } from "react";
import { Card, CardContent, Input, Button, Container } from "@/components/ui";
import { useTrackParcelQuery } from "@/services/apiSlice";
import { IParcel } from "@/types/parcel";

export default function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    data: parcel,
    isFetching,
    isError,
  } = useTrackParcelQuery(submittedId!, { skip: !submittedId });

  const handleTrack = () => {
    const trimmedId = trackingId.trim();
    if (trimmedId) setSubmittedId(trimmedId);
  };

  return (
    <Container className="py-12 flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg border border-gray-200">
        <CardContent className="space-y-6 p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Track Your Parcel
          </h1>

          <div className="flex gap-2">
            <Input
              placeholder="Enter tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <Button
              onClick={handleTrack}
              disabled={isFetching}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isFetching ? "Tracking..." : "Track"}
            </Button>
          </div>

          {isError && (
            <p className="text-red-500 text-center font-medium">
              ❌ Parcel not found. Please check your tracking ID.
            </p>
          )}

          {parcel && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
              <h2 className="text-xl font-semibold text-center text-gray-700">
                📦 Parcel Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                <p>
                  <strong>Status:</strong> {parcel.status}
                </p>
                <p>
                  <strong>Type:</strong> {parcel.type}
                </p>
                <p>
                  <strong>Weight:</strong> {parcel.weight} kg
                </p>
                <p>
                  <strong>Tracking ID:</strong> {parcel.trackingId}
                </p>
                <p>
                  <strong>Pickup Address:</strong> {parcel.pickupAddress}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {parcel.deliveryAddress}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(parcel.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated:</strong>{" "}
                  {new Date(parcel.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
