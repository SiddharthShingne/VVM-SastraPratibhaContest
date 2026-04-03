/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaLink,
  FaTrophy,
  FaDownload,
  FaPhone,
  FaUserCog,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

import { logoutUser } from "@/services/authService";
import axiosInstance from "@/services/axiosInstance";

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

// ─── Helper: extract name from any known shape ─────────────────
function extractNameFromStorage(): string {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "Student";

    const parsed = JSON.parse(raw);

    // Debug — remove after confirming
    console.log("🔍 localStorage user:", parsed);

    // Shape 1: { user_detail: { name } }  ← most likely your case
    if (parsed?.user_detail?.name) return parsed.user_detail.name;

    // Shape 2: { user: { user_detail: { name } } }  ← wrapped once
    if (parsed?.user?.user_detail?.name) return parsed.user.user_detail.name;

    // Shape 3: { data: { user_detail: { name } } }
    if (parsed?.data?.user_detail?.name) return parsed.data.user_detail.name;

    // Shape 4: { data: { user: { user_detail: { name } } } }
    if (parsed?.data?.user?.user_detail?.name)
      return parsed.data.user.user_detail.name;

    // Shape 5: profile fallback
    if (parsed?.profile?.name) return parsed.profile.name;
    if (parsed?.user?.profile?.name) return parsed.user.profile.name;

    // Shape 6: username fallback
    if (parsed?.user_detail?.username) return parsed.user_detail.username;
    if (parsed?.username) return parsed.username;
    if (parsed?.user?.username) return parsed.user.username;

    return "Student";
  } catch (err) {
    console.error("extractNameFromStorage error:", err);
    return "Student";
  }
}

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    const name = extractNameFromStorage();
    setStudentName(name);
  }, []);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  if (!token) return null;

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

  return (
    <div className="min-h-screen m-10">
      <div className="container mx-auto mt-12 px-4">
        <div className="flex gap-6 items-start">
          {/* ── SIDEBAR ── */}
          <aside
            className={[
              "sticky top-25 h-[calc(100vh-120px)]",
              "w-75 xl:w-[320px] shrink-0",
              "overflow-y-auto overflow-x-hidden",
              "rounded-3xl relative",
              "bg-white/85 backdrop-blur-sm",
              "border-[1.5px] border-white/40",
              "ring-4 ring-[rgba(23,57,92,0.04)]",
              "shadow-[0_8px_32px_rgba(23,57,92,0.08),0_2px_8px_rgba(23,57,92,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]",
              "hover:shadow-[0_16px_48px_rgba(23,57,92,0.12),0_4px_12px_rgba(23,57,92,0.06)]",
              "transition-all duration-300",
              "[&::-webkit-scrollbar]:w-1.25",
              "[&::-webkit-scrollbar-track]:bg-[rgba(23,57,92,0.02)] [&::-webkit-scrollbar-track]:my-2",
              "[&::-webkit-scrollbar-thumb]:rounded-[10px]",
              "[&::-webkit-scrollbar-thumb]:bg-[rgba(23,57,92,0.12)]",
              "[&::-webkit-scrollbar-thumb:hover]:bg-[#f4df17]",
            ].join(" ")}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(23,57,92,0.12) transparent",
            }}
          >
            {/* Top stripe */}
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-3xl z-10 shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
              }}
            />

            <div className="px-4.5 pb-6 pt-7.5">
              {/* ── USER HEADER ── */}
              <div className="text-center pb-5 mb-3 relative">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-black text-[16px] shadow-[0_4px_14px_rgba(23,57,92,0.2)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)",
                  }}
                >
                  {studentName.charAt(0).toUpperCase()}
                </div>

                <p className="text-[10px] text-[#8fa2b8] uppercase tracking-[1.2px] font-bold mb-1">
                  Welcome back
                </p>

                <h6
                  className="text-[16px] font-black tracking-[-0.2px] leading-[1.3] mb-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #17395c 0%, #1f6fa3 60%, #b88d00 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {studentName}
                </h6>

                <div className="mt-4 h-px bg-[#e8eef4] relative">
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -top-px w-10 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #17395c, #f4df17)",
                    }}
                  />
                </div>
              </div>

              {/* ── MAIN NAV ── */}
              <nav className="space-y-0.75 mt-1">
                <Link
                  href="/studentDashboard"
                  className={linkClass("/studentDashboard")}
                >
                  <FaHome className={iconClass("/studentDashboard")} />
                  <span className="flex-1 leading-[1.3]">Dashboard</span>
                </Link>

                <Link
                  href="/studentDashboard/download-app"
                  className={linkClass("/studentDashboard/download-app")}
                >
                  <FaDownload
                    className={iconClass("/studentDashboard/download-app")}
                  />
                  <span className="flex-1 leading-[1.3]">Download Apps</span>
                </Link>
              </nav>

              <NavDivider />

              <SectionTitle label="Contact" />
              <nav className="space-y-0.75">
                <Link
                  href="/studentDashboard/contact"
                  className={linkClass("/studentDashboard/contact")}
                >
                  <FaPhone className={iconClass("/studentDashboard/contact")} />
                  <span className="flex-1 leading-[1.3]">
                    Contact Information
                  </span>
                </Link>
              </nav>

              <NavDivider />

              <SectionTitle label="Profile" />
              <nav className="space-y-0.75">
                <Link
                  href="/studentDashboard/edit-profile"
                  className={linkClass("/studentDashboard/edit-profile")}
                >
                  <FaUserCog
                    className={iconClass("/studentDashboard/edit-profile")}
                  />
                  <span className="flex-1 leading-[1.3]">Edit Profile</span>
                </Link>

                <Link
                  href="/studentDashboard/update-password"
                  className={linkClass("/studentDashboard/update-password")}
                >
                  <FaKey
                    className={iconClass("/studentDashboard/update-password")}
                  />
                  <span className="flex-1 leading-[1.3]">Update Password</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className={[
                    "group w-full flex items-center gap-3 min-h-11.5 px-3.5 rounded-xl",
                    "text-[13.5px] font-semibold cursor-pointer",
                    "text-[#4a6278] border border-transparent",
                    "transition-all duration-220",
                    "hover:bg-linear-to-br hover:from-[#b83232] hover:to-[#e04040]",
                    "hover:text-white hover:border-white/20",
                    "hover:shadow-[0_6px_20px_rgba(184,50,50,0.28)]",
                  ].join(" ")}
                >
                  <FaSignOutAlt className="text-[17px] w-5 shrink-0 text-[#7a8fa6] group-hover:text-white group-hover:scale-110 transition-all duration-220" />
                  <span className="flex-1 leading-[1.3] text-left">
                    Logout
                  </span>
                </button>
              </nav>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0">
            <div
              className="
                relative
                rounded-3xl
                p-8
                min-h-125
                bg-linear-to-br from-white via-[#f9fbfd] to-[#eef3f8]
                border border-white/60
                backdrop-blur-xl
                shadow-[0_10px_30px_rgba(23,57,92,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
                transition-all duration-300
                hover:shadow-[0_25px_60px_rgba(23,57,92,0.15),inset_0_1px_0_rgba(255,255,255,1)]
              "
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/40 via-transparent to-transparent opacity-60" />
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}