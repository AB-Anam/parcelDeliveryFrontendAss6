import React from "react";
import { useGetUsersQuery, useBlockUserMutation, User } from "@/services/userApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui";
import { Loader2 } from "lucide-react";

export default function UserManagement(): JSX.Element {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const handleToggle = async (user: User) => {
    try {
      await blockUser({ id: user._id, blocked: !user.blocked }).unwrap();
      // refetch to get latest list (RTK invalidation may already do this)
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 p-6">
        Failed to fetch users.
      </div>
    );

  return (
    <Container className="py-12">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">User Management</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((u: User) => (
                    <tr key={u._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{u.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{u.email}</td>
                      <td className="py-3 px-4">{u.role}</td>
                      <td className="py-3 px-4">
                        {u.blocked ? (
                          <span className="text-red-600 font-semibold">Blocked</span>
                        ) : (
                          <span className="text-green-600 font-semibold">Active</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => handleToggle(u)}
                          disabled={isBlocking}
                          className="px-3 py-1"
                        >
                          {u.blocked ? "Unblock" : "Block"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
