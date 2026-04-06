/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaDownload,
  FaPhone,
  FaUserCog,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

import { logoutUser } from "@/services/authService";
import axiosInstance from "@/services/axiosInstance";

// ─── Helper: clean & correct ─────────────────
function extractNameFromStorage(): string {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "Student";

    const user = JSON.parse(raw);

    return user?.user_detail?.name || "Student";
  } catch (err) {
    console.error("extractNameFromStorage error:", err);
    return "Student";
  }
}

// ─── UI Helpers ─────────────────
function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mt-5 mb-1.5 ml-0.5">
      <div
        className="w-0.75 h-3 rounded-sm shrink-0"
        style={{ background: "linear-gradient(180deg, #17395c, #f4df17)" }}
      />
      <span className="text-[10.5px] font-extrabold text-[#7a90a8] uppercase tracking-[1.1px]">
        {label}
      </span>
    </div>
  );
}

function NavDivider() {
  return (
    <div
      className="my-3 h-px mx-1"
      style={{
        background:
          "linear-gradient(90deg, transparent, #c2d4e8 30%, #c2d4e8 70%, transparent)",
      }}
    />
  );
}

// ─── MAIN LAYOUT ─────────────────
export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ FIX: initialize properly (no flicker)
  const [studentName, setStudentName] = useState(() => {
    if (typeof window !== "undefined") {
      return extractNameFromStorage();
    }
    return "Student";
  });

  const [token, setToken] = useState<string | null>(null);

  // ✅ Load token safely
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // ✅ Protect route
  useEffect(() => {
    if (token === null) return; // wait until loaded

    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  // ✅ Optional debug (remove later)
  useEffect(() => {
    console.log("Sidebar User:", localStorage.getItem("user"));
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed, forcing logout", error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      delete axiosInstance.defaults.headers.common["Authorization"];
      router.replace("/Login");
    }
  };

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    [
      "group relative flex items-center gap-3 min-h-11.5 px-3.5 rounded-xl",
      "text-[13.5px] font-semibold no-underline cursor-pointer",
      "transition-all duration-220 ease-out overflow-hidden",
      isActive(path)
        ? "bg-gradient-to-br from-[#17395c] to-[#1f4e7a] text-white border border-white/20 shadow-[0_8px_24px_rgba(23,57,92,0.30),inset_0_1px_0_rgba(255,255,255,0.18)]"
        : "text-[#4a6278] border border-transparent hover:bg-[rgba(23,57,92,0.06)] hover:border-[#d0dde9] hover:text-[#17395c] hover:shadow-[0_4px_12px_rgba(23,57,92,0.08)]",
    ].join(" ");

  const iconClass = (path: string) =>
    [
      "text-[17px] w-5 shrink-0 transition-all duration-220",
      isActive(path)
        ? "text-[#f4df17]"
        : "text-[#7a8fa6] group-hover:text-[#b88d00] group-hover:scale-110 group-hover:-rotate-3",
    ].join(" ");

  // ⛔ prevent render until token check completes
  if (token === null) return null;
  if (!token) return null;

  return (
    <div className="min-h-screen m-10">
      <div className="container mx-auto mt-12 px-4">
        <div className="flex gap-6 items-start">
          {/* ── SIDEBAR ── */}
          <aside className="sticky top-25 h-[calc(100vh-120px)] w-75 xl:w-[320px] shrink-0 overflow-y-auto rounded-3xl bg-white/85 backdrop-blur-sm border border-white/40 shadow-lg">

            <div className="px-4.5 pb-6 pt-7.5">

              {/* USER HEADER */}
              <div className="text-center pb-5 mb-3">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-black text-[16px] bg-[#17395c]">
                  {studentName.charAt(0).toUpperCase()}
                </div>

                <p className="text-[10px] text-[#8fa2b8] uppercase font-bold mb-1">
                  Welcome back
                </p>

                <h6 className="text-[16px] font-black text-[#17395c]">
                  {studentName}
                </h6>
              </div>

              {/* NAV */}
              <nav className="space-y-1">
                <Link href="/studentDashboard" className={linkClass("/studentDashboard")}>
                  <FaHome className={iconClass("/studentDashboard")} />
                  Dashboard
                </Link>

                <Link href="/studentDashboard/download-app" className={linkClass("/studentDashboard/download-app")}>
                  <FaDownload className={iconClass("/studentDashboard/download-app")} />
                  Download Apps
                </Link>
              </nav>

              <NavDivider />

              <SectionTitle label="Contact" />
              <Link href="/studentDashboard/contact" className={linkClass("/studentDashboard/contact")}>
                <FaPhone className={iconClass("/studentDashboard/contact")} />
                Contact Information
              </Link>

              <NavDivider />

              <SectionTitle label="Profile" />
              <nav className="space-y-1">
                <Link href="/studentDashboard/edit-profile" className={linkClass("/studentDashboard/edit-profile")}>
                  <FaUserCog className={iconClass("/studentDashboard/edit-profile")} />
                  Edit Profile
                </Link>

                <Link href="/studentDashboard/update-password" className={linkClass("/studentDashboard/update-password")}>
                  <FaKey className={iconClass("/studentDashboard/update-password")} />
                  Update Password
                </Link>

                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-red-500 hover:text-white transition">
                  <FaSignOutAlt />
                  Logout
                </button>
              </nav>

            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1">
            <div className="rounded-3xl p-8 bg-white shadow">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}