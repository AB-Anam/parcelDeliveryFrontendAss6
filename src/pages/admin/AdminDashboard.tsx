// src/pages/admin/AdminDashboard.tsx
import React from "react";
import { useGetAllParcelsQuery } from "../../services/parcelApi";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { data, isLoading, error } = useGetAllParcelsQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error fetching parcels.
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-2">
          <Button variant="ghost" className="justify-start w-full">Dashboard</Button>
          <Button variant="ghost" className="justify-start w-full">Users</Button>
          <Button variant="ghost" className="justify-start w-full">Parcels</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">All Parcels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-700">Parcel List</h2>
              <Button variant="default">Add New Parcel</Button>
            </div>

            {data && data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
                      <th className="py-3 px-4">Tracking ID</th>
                      <th className="py-3 px-4">Sender</th>
                      <th className="py-3 px-4">Receiver</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((parcel) => (
                      <tr key={parcel.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono">{parcel.trackingId}</td>
                        <td className="py-3 px-4">{parcel.sender}</td>
                        <td className="py-3 px-4">{parcel.receiver}</td>
                        <td className="py-3 px-4 text-sm">{parcel.status}</td>
                        <td className="py-3 px-4 space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="destructive">Block</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No parcels found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
