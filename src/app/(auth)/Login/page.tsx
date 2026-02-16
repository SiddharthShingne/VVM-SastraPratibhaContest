"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Invalid credentials");
                setLoading(false);
                return;
            }

            // Store token and username
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username || username);
            }

            // Redirect only if login successful
            router.push("/studentDashboard");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Server error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6fb]">

            {/* Header */}
            <div className="bg-[#e9edf5] py-16 text-center">
                <h1 className="text-5xl font-bold text-[#1f2a44]">
                    Login
                </h1>
                <p className="mt-4 text-lg font-semibold text-gray-600">
                    Home <span className="mx-2 text-gray-400">›</span> Login
                </p>
            </div>

            {/* Login Card */}
            <div className="flex justify-center py-12 px-4">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10">

                    <h2 className="text-2xl font-semibold text-[#1f2a44] mb-6">
                        Welcome Back
                    </h2>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Username */}
                        <div>
                            <label className="block text-gray-600 mb-2">
                                Username *
                            </label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-600 mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg text-white font-semibold
                            bg-linear-to-r from-blue-600 to-purple-600
                            hover:opacity-90 transition"
                        >
                            {loading ? "Logging In..." : "Log In"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
