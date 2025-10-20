import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import SenderDashboard from "./pages/sender/SenderDashboard";
import ReceiverDashboard from "./pages/receiver/ReceiverDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import CreateParcelPage from "./features/parcels/CreateParcelPage";
import AdminUserManagementPage from "./features/users/AdminUserManagementPage";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import PublicLayout from "./layouts/PublicLayout";

export default function App() {
  // ✅ Access environment variables here
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", apiUrl); // Example: log it for debugging

 return (
    <Routes>
        <Route element={<PublicLayout />}>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>

      {/* Sender Routes */}
      <Route
        path="/sender/*"
        element={
          <ProtectedRoute>
            <RoleRoute role="sender">
              <Routes>
                <Route index element={<SenderDashboard />} />
                <Route path="create" element={<CreateParcelPage />} />
              </Routes>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Receiver Routes */}
      <Route
        path="/receiver/*"
        element={
          <ProtectedRoute>
            <RoleRoute role="receiver">
              <Routes>
                <Route index element={<ReceiverDashboard />} />
              </Routes>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserManagementPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}