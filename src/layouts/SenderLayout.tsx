// src/layouts/SenderLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SenderLayout() {
  const navigate = useNavigate();

  // 🔹 Retrieve logged-in user info
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || "sender"; // fallback for safety

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("You have been logged out successfully!");
    // 🔹 Redirect to home instead of login
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/sender")}
        >
          <h1 className="text-xl font-semibold">📦 Sender Dashboard</h1>
          <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            Role: {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>

        <div className="flex gap-3">

          <Button
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
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

      {/* 🔹 Page Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
