import React from "react";
import { useGetMyParcelsQuery } from "../../services/apiSlice";
import { Card, CardContent } from "@/components/ui";
import { Link } from "react-router-dom";

export default function SenderDashboard() {
  const { data, isLoading } = useGetMyParcelsQuery();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Sender Dashboard</h2>
        <Link to="/sender/create" className="text-blue-600">Create Parcel</Link>
      </div>
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
