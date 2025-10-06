// src/pages/admin/UserManagement.tsx
import React from "react";
import { useGetUsersQuery, useBlockUserMutation, User } from "@/services/userApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const UserManagement: React.FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const handleBlockToggle = async (user: User) => {
    try {
      await blockUser({ id: user._id, blocked: !user.blocked }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Failed to fetch users.
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Card className="max-w-6xl mx-auto shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">
                      {user.blocked ? (
                        <span className="text-red-600 font-medium">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-medium">Active</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant={user.blocked ? "outline" : "destructive"}
                        disabled={isBlocking}
                        onClick={() => handleBlockToggle(user)}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users?.length === 0 && (
              <p className="text-gray-500 mt-4 text-center">No users found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
