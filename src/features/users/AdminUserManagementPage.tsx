import { useGetUsersQuery, useBlockUserMutation } from "@/services/apiSlice";
import { Navbar, Footer, Container, Card, CardContent, Button } from "@/components/ui";

export default function AdminUserManagement() {
  const { data: users, refetch } = useGetUsersQuery();
  const [blockUser] = useBlockUserMutation();

  const toggleBlock = async (id: string, blocked: boolean) => {
    await blockUser({ id, blocked }).unwrap();
    refetch();
  };

  return (
    <>
      <Navbar />
      <Container className="py-12">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <div className="grid gap-4">
          {users?.map((user: any) => (
            <Card key={user._id}>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-sm">{user.role}</p>
                </div>
                <Button onClick={() => toggleBlock(user._id, !user.blocked)}>
                  {user.blocked ? "Unblock" : "Block"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}
