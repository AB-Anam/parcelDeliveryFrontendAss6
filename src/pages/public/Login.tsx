import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/services/apiSlice";

// Match your backend response exactly
interface LoginResponse {
  success: boolean;
  token: {
    token: string;
    user: {
      id: string;
      email: string;
      role: "sender" | "receiver" | "admin";
    };
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Treat response as unknown first, then cast
      const response = (await login({ email, password }).unwrap()) as unknown as LoginResponse;

      if (!response.success) {
        alert("Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", response.token.token);

      // Redirect based on role
      const role = response.token.user.role;
      if (role === "sender") navigate("/sender");
      else if (role === "receiver") navigate("/receiver");
      else if (role === "admin") navigate("/admin");
      else navigate("/"); // fallback
    } catch (err: any) {
      alert(err.data?.message || err.message || "Login failed");
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
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2 rounded"
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
      </div>
    </div>
  );
};

export default Login;
