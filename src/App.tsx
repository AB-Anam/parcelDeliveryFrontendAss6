import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import TrackParcel from "./pages/public/TrackParcel";

import SenderDashboard from "./pages/sender/SenderDashboard";
import ReceiverDashboard from "./pages/receiver/ReceiverDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import CreateParcelPage from "./features/parcels/CreateParcelPage";
import AdminUserManagementPage from "./features/users/AdminUserManagementPage";
import AdminLayout from "./layouts/AdminLayout";
import ReceiverLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import PublicLayout from "./layouts/PublicLayout";
import SenderLayout from "./layouts/SenderLayout";

export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", apiUrl);

  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/track" element={<TrackParcel />} />
      </Route>

{/* Sender Routes */}
<Route element={<ProtectedRoute />}>
  <Route element={<RoleRoute role="sender" />}>
    <Route element={<SenderLayout />}>
      <Route path="/sender" element={<SenderDashboard />} />
      <Route path="/sender/create" element={<CreateParcelPage />} />
    </Route>
  </Route>
</Route>

{/* Receiver Routes */}
<Route element={<ProtectedRoute />}>
     <Route element={<ReceiverLayout />}>
      <Route path="/receiver" element={<ReceiverDashboard />} />
    </Route>
</Route>

{/* Admin Routes */}
<Route element={<ProtectedRoute />}>
   <Route element={<AdminLayout />}>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUserManagementPage />} />
    </Route>
</Route>



      {/* 🚫 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
