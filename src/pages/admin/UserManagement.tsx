// src/pages/admin/UserManagement.tsx
import React from "react";
import { useBlockUserMutation, useGetUsersQuery } from "@/services/apiSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserManagement: React.FC = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [blockUser] = useBlockUserMutation();

  if (isLoading) return <div className="text-center mt-20">Loading users...</div>;
  if (isError) return <div className="text-center mt-20 text-red-500">Failed to load users.</div>;

  const handleBlockToggle = (id: string, blocked: boolean) => {
    blockUser({ id, blocked: !blocked });
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map((user) => (
          <Card key={user._id} className="p-4 hover:shadow-lg transition-shadow">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Role:</span> {user.role}</p>
            <p><span className="font-medium">Blocked:</span> {user.blocked ? "Yes" : "No"}</p>
            <Button
              variant={user.blocked ? "destructive" : "secondary"}
              onClick={() => handleBlockToggle(user._id, !!user.blocked)}
              className="mt-2"
            >
              {user.blocked ? "Unblock" : "Block"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
