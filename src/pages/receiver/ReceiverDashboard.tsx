import React from "react";
import { useGetMyParcelsQuery } from "../../services/apiSlice";
import { Card, CardContent } from "@/components/ui";

export default function ReceiverDashboard() {
  const { data, isLoading } = useGetMyParcelsQuery();

  return (
    <div className="p-6">
      <h2 className="text-2xl">Receiver Dashboard</h2>
      <Card className="mt-4">
        <CardContent>
          {isLoading ? <p>Loading...</p> : (
            <ul className="space-y-2">
              {data?.map((p: any) => (
                <li key={p._id} className="p-3 border rounded">{p.trackingId || p._id} — {p.status}</li>
              )) || <p>No parcels</p>}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
