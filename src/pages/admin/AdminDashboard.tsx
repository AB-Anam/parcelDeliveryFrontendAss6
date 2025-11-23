// src/pages/admin/AdminDashboard.tsx
import React from "react";
import { useGetUsersQuery } from "@/services/userApiSlice";
import { useGetAllParcelsQuery } from "@/services/parcelApiSlice";
import { IUser } from "@/types/user";
import { IParcel } from "@/types/parcel";
import { useBlockUserMutation } from "@/services/userApiSlice";
import { Button } from "@/components/ui/button";

const AdminDashboard: React.FC = () => {
  // Fetch users
  const { data: users, isLoading: usersLoading, isError: usersError } = useGetUsersQuery();

  // Fetch parcels
  const { data: parcels, isLoading: parcelsLoading, isError: parcelsError } = useGetAllParcelsQuery();

  const [blockUser] = useBlockUserMutation();

  const handleToggleBlock = async (user: IUser) => {
    try {
      await blockUser({ id: user._id, blocked: !user.blocked }).unwrap();
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-xl font-bold">{users?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Parcels</p>
          <p className="text-xl font-bold">{parcels?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Delivered Parcels</p>
          <p className="text-xl font-bold">
            {parcels?.filter((p: IParcel) => p.status === "delivered").length || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">In-Transit Parcels</p>
          <p className="text-xl font-bold">
            {parcels?.filter((p: IParcel) => p.status === "in-transit").length || 0}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Users</h2>
        {usersLoading ? (
          <p>Loading users...</p>
        ) : usersError ? (
          <p className="text-red-500">Error loading users</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Blocked</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: IUser) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">{user.blocked ? "Yes" : "No"}</td>
                  <td className="p-2 border">
                    <Button
                      size="sm"
                      onClick={() => handleToggleBlock(user)}
                      className={user.blocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Parcels Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Parcels</h2>
        {parcelsLoading ? (
          <p>Loading parcels...</p>
        ) : parcelsError ? (
          <p className="text-red-500">Error loading parcels</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Tracking ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Weight</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels?.map((p: IParcel) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{p.trackingId}</td>
                  <td className="p-2 border">{p.type}</td>
                  <td className="p-2 border">{p.weight}</td>
                  <td className="p-2 border">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
