"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    // Read values directly (no state needed)
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const username =
        typeof window !== "undefined"
            ? localStorage.getItem("username") || "User"
            : "User";

    // 🔐 Route protection
    useEffect(() => {
        if (!token) {
            router.replace("/Login");
        }
    }, [token, router]);

    // Prevent rendering before auth check
    if (!token) return null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        router.replace("/Login");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#eef2ff] to-[#f8fafc] px-6 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Sidebar */}
                <aside className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

                    {/* User Info */}
                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {username}
                        </h3>
                        <p className="text-sm text-gray-500">Student</p>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-6 text-sm">
                        <div>
                            <p className="font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                Dashboard
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                Result
                            </p>
                            <ul className="space-y-2">
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Level 1 Result
                                </li>
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Level 2 Result
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                Study Material
                            </p>
                            <ul className="space-y-2">
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Study Material
                                </li>
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Contact Information
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                Profile
                            </p>
                            <ul className="space-y-2">
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Edit Profile
                                </li>
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Update Password
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-500 cursor-pointer transition"
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="md:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                        IMPORTANT DATES TO REMEMBER
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm text-gray-700">
                            <thead>
                                <tr className="bg-indigo-50 text-gray-800 text-left">
                                    <th className="p-4 font-semibold">Sr. No.</th>
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t hover:bg-gray-50 transition">
                                    <td className="p-4">1</td>
                                    <td className="p-4 font-medium">Level 1 Exam</td>
                                    <td className="p-4">
                                        GCC - November 8 for all GCC countries for all classes.
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50 transition">
                                    <td className="p-4">2</td>
                                    <td className="p-4 font-medium">Level 2 Exam</td>
                                    <td className="p-4">
                                        International students contact Science India forum.
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50 transition">
                                    <td className="p-4">3</td>
                                    <td className="p-4 font-medium">State Camp</td>
                                    <td className="p-4">
                                        Contact respective international forum for details.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
