import React, { useState } from "react";
import { useTrackParcelQuery } from "../../services/apiSlice";
import { Container, Card, CardContent, Input, Button } from "@/components/ui";

export default function Landing() {
  const [trackingId, setTrackingId] = useState("");
  const { data, refetch, isFetching } = useTrackParcelQuery(trackingId, { skip: !trackingId });

  const onTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) refetch();
  };

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Parcel Delivery</h1>
        <div>/* Logo Ipsum */</div>
      </div>

      <Card className="mt-8">
        <CardContent>
          <h2 className="text-xl mb-4">Track Parcel</h2>
          <form onSubmit={onTrack} className="flex gap-2">
            <Input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Enter tracking ID" />
            <Button type="submit">Track</Button>
          </form>

          {isFetching && <p className="mt-4">Loading...</p>}
          {data && (
            <div className="mt-4 p-3 border rounded bg-gray-50">
              <p><strong>Status:</strong> {data.status}</p>
              <pre className="mt-2 text-sm">{JSON.stringify(data.history || data, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
