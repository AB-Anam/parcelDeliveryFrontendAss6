import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = async () => {
    // TODO: call API to track parcel
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-bold text-center">Track Your Parcel</h1>
          <Input
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <Button onClick={handleTrack} className="w-full rounded-xl">
            Track
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
