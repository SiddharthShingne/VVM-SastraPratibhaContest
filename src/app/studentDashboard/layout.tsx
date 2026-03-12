"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaHome,
  FaTrophy,
  FaDownload,
  FaBook,
  FaInfoCircle,
  FaUserCog,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

import { logoutUser } from "@/services/authService";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const username =
    typeof window !== "undefined"
      ? localStorage.getItem("username") || "Student"
      : "Student";

  const studentname =
    typeof window !== "undefined"
      ? localStorage.getItem("studentname") || "Student"
      : "Student";

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  if (!token) return null;

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("studentname");

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition ${
      isActive(href)
        ? "text-[#4c48c9] font-medium"
        : "text-gray-500 hover:text-[#4c48c9]"
    }`;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0f2fa] to-[#e9ecf7] py-8">
      <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-7">
        <aside className="bg-white rounded-lg shadow-md border border-[#7F7BDA] p-4 sticky top-6 h-fit">
          <div className="mb-6 mt-1">
            <p className="text-[12px] font-semibold text-[#7F7BDA] uppercase tracking-wider">
              Welcome Back
            </p>

            <div className="mt-2 text-[15px] font-semibold text-gray-800 uppercase tracking-wide">
              {username || "Student"}
            </div>

            <div className="text-[12px] text-gray-500">
              {studentname || "Student ID"}
            </div>
          </div>

          <nav className="space-y-4">
            <Link
              href="/studentDashboard"
              className={linkClass("/studentDashboard")}
            >
              <FaHome className="text-[15px]" />
              Dashboard
            </Link>

            <Link
              href="/studentDashboard/level1-result"
              className={linkClass("/studentDashboard/level1-result")}
            >
              <FaTrophy className="text-[15px]" />
              Level 1 Result
            </Link>

            <Link
              href="/studentDashboard/level2-result"
              className={linkClass("/studentDashboard/level2-result")}
            >
              <FaTrophy className="text-[15px]" />
              Level 2 Result
            </Link>

            <Link
              href="/studentDashboard/download-app"
              className={linkClass("/studentDashboard/download-app")}
            >
              <FaDownload className="text-[15px]" />
              Download Apps
            </Link>

            <Link
              href="/studentDashboard/study-material"
              className={linkClass("/studentDashboard/study-material")}
            >
              <FaBook className="text-[15px]" />
              Study Material
            </Link>

            <Link
              href="/studentDashboard/contact"
              className={linkClass("/studentDashboard/contact")}
            >
              <FaInfoCircle className="text-[15px]" />
              Contact Information
            </Link>

            <Link
              href="/studentDashboard/edit-profile"
              className={linkClass("/studentDashboard/edit-profile")}
            >
              <FaUserCog className="text-[15px]" />
              Edit Profile
            </Link>

            <Link
              href="/studentDashboard/update-password"
              className={linkClass("/studentDashboard/update-password")}
            >
              <FaKey className="text-[15px]" />
              Update Password
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-[15px] text-gray-500 hover:text-white hover:bg-red-500 rounded-md transition-all"
            >
              <FaSignOutAlt className="text-[15px]" />
              Logout
            </button>
          </nav>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 text-center">
              © 2026 Student Portal
            </p>
          </div>
        </aside>

        <main className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 min-h-105">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}