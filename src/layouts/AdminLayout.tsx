import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Card } from "@/components/ui";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/parcels">Parcels</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Card className="p-4">
          <Outlet />
        </Card>
      </main>
    </div>
  );
}
