// src/pages/public/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "@/services/apiSlice";
import { cn } from "@/lib/utils";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res: any = await login({ email, password }).unwrap();
    console.log("✅ Login response:", res);

    const tokenData = res.token; // contains { token, user }
    localStorage.setItem("token", tokenData.token);
    localStorage.setItem("user", JSON.stringify(tokenData.user));

    const role = tokenData.user.role;
    console.log("🧭 User role:", role);

    if (role === "sender") navigate("/sender");
    else if (role === "receiver") navigate("/receiver");
    else if (role === "admin") navigate("/admin");
    else navigate("/");
  } catch (err: any) {
    console.error("❌ Login error:", err);
    alert(err.data?.message || "Login failed");
  }
};


  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn("w-full border p-2 rounded")}
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cn("w-full border p-2 rounded")}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
