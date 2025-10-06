import React from "react";
import { useGetAllParcelsQuery } from "../../services/apiSlice";
import { Card, CardContent } from "@/components/ui";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { data, isLoading } = useGetAllParcelsQuery();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Admin Dashboard</h2>
        <div className="space-x-3">
          <Link to="/admin/users" className="text-blue-600">Users</Link>
          <Link to="/admin/parcels" className="text-blue-600">Parcels</Link>
        </div>
      </div>

      <Card className="mt-4">
        <CardContent>
          {isLoading ? <p>Loading...</p> : (
            <>
              <p>Total parcels: {data?.length ?? 0}</p>
              <ul className="mt-4 space-y-2">
                {data?.map((p: any) => (
                  <li key={p._id} className="p-3 border rounded">{p.trackingId || p._id} — {p.status}</li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
