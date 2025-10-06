import React from "react";
import { useGetUsersQuery, useBlockUserMutation } from "../../services/apiSlice";
import { Card, CardContent, Button } from "@/components/ui";

export default function AdminUserManagementPage() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [blockUser] = useBlockUserMutation();

  const toggleBlock = async (id: string, blocked: boolean) => {
    try {
      await blockUser({ id, blocked: !blocked }).unwrap();
    } catch {
      alert("Failed to update user");
    }
  };

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl">Manage Users</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {users?.map((u: any) => (
              <li key={u._id} className="flex justify-between items-center border p-2 rounded">
                <span>{u.email} ({u.role})</span>
                <Button onClick={() => toggleBlock(u._id, u.blocked)}>{u.blocked ? "Unblock" : "Block"}</Button>
              </li>
            )) || <p>No users</p>}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
