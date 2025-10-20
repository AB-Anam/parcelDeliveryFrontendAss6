import { useState } from "react";
import { Card, CardContent, Input, Button } from "@/components/ui";

export default function Landing() {
  const [trackingId, setTrackingId] = useState("");
  const [parcelInfo, setParcelInfo] = useState(null);

  const trackParcel = async () => {
    // call your trackParcel API here
  };

  return (
    <div className="py-12">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Track Parcel</h1>
          <div className="flex gap-2">
            <Input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID"
            />
            <Button onClick={trackParcel}>Track</Button>
          </div>
        </CardContent>
      </Card>

      {parcelInfo && (
        <div className="max-w-md mx-auto mt-6 p-4 border rounded">
          <pre>{JSON.stringify(parcelInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
