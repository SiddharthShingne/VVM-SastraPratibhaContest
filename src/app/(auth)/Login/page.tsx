"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import HeaderTag from "@/components/ui/Header-tag";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      router.replace("/studentDashboard");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <HeaderTag title="Login" breadcrumb="Login" />

      <div className="flex justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#1f2a44] mb-6 text-center">
            Log In
          </h2>

          {localError && (
            <p className="text-red-500 text-sm mb-4 text-center">{localError}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-9 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white text-sm font-medium bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}