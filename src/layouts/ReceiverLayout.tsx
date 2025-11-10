// src/layouts/ReceiverLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReceiverLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || "receiver";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("You have been logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-6 py-4 bg-green-600 text-white shadow">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/receiver")}
        >
          <h1 className="text-xl font-semibold">📦 Receiver Dashboard</h1>
          <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            Role: {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white text-green-600 px-3 py-1 rounded-full">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
            <span className="font-medium">{user?.name || "User"}</span>
          </div>

          <Button
            variant="secondary"
            className="bg-white text-green-600 hover:bg-gray-100"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </Button>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleLogout}
          >
            🚪 Logout
          </Button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
