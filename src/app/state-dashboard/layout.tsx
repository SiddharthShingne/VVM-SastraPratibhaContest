
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaUserGraduate,
  FaSchool,
  FaKey,
  FaUser,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { logoutUser } from "@/services/authService";
import axiosInstance from "@/services/axiosInstance";

/* ---------------- GET NAME ---------------- */
function extractNameFromStorage(): string {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "State Coordinator";
    const user = JSON.parse(raw);
    return user?.user_detail?.name || "State Coordinator";
  } catch (err) {
    return "State Coordinator";
  }
}

/* ---------------- UI SMALL COMPONENTS ---------------- */
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

/* ---------------- MAIN LAYOUT ---------------- */
export default function StateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") return extractNameFromStorage();
    return "State Coordinator";
  });

  const [token, setToken] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
const [studentOpen, setStudentOpen] = useState(false);
const [schoolOpen, setSchoolOpen] = useState(false);
const [openMenu, setOpenMenu] = useState<"student" | "school" | null>(null);

const isSchoolActive = pathname.startsWith("/stateDashboard/schools");

const isStudentActive = pathname.startsWith("/stateDashboard/students");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token === null) return;
    if (!token) router.replace("/Login");
  }, [token, router]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
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

  if (token === null || !token) return null;

  const SidebarContent = () => (
    <div className="px-5 pb-6 pt-8">
      <div className="text-center pb-5 mb-3 border-b border-[#eef2f7]">
        <div
          className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-black text-[18px] shadow-md transition-transform duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)" }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <p className="text-[10px] text-[#8fa2b8] uppercase font-bold mb-1 tracking-wide">
          Welcome State Coordinator
        </p>
        <h6 className="shine-name text-[17px] font-extrabold">
          {name}
        </h6>
      </div>

      <nav className="space-y-1">
        <Link href="/state-dashboard" className={linkClass("/state-dashboard")}>
          <FaHome className={iconClass("/state-dashboard")} />
          Dashboard
        </Link>
  
        
          <div>
    <button
      onClick={() => setStudentOpen(!studentOpen)}
      
      className={[
        "group relative flex items-center justify-between w-full min-h-11.5 px-3.5 rounded-xl",
        "text-[13.5px] font-semibold transition-all duration-220",
        isStudentActive
          ? "bg-gradient-to-br from-[#17395c] to-[#1f4e7a] text-white"
          : "text-[#4a6278] hover:bg-[rgba(23,57,92,0.06)] hover:text-[#17395c]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <FaUserGraduate
          className={[
            "text-[17px] transition-all",
            isStudentActive
              ? "text-[#f4df17]"
              : "text-[#7a8fa6] group-hover:text-[#b88d00]",
          ].join(" ")}
        />
        Students
      </div>

      <span className="text-xs">{studentOpen ? "▲" : "▼"}</span>
    </button>

    {studentOpen && (
      <div className="ml-8 mt-1 space-y-1">
        <Link
          href="/state-dashboard/student/student-bulk-import"
          className={linkClass("/state-dashboard/student/student-bulk-import")}
        >
          Students Bulk Import
        </Link>

        <Link
          href="/state-dashboard/student/view-indivisual-student"
          className={linkClass("/state-dashboard/student/view-indivisual-student")}
        >
          View Individual Students
        </Link>

        <Link
          href="/state-dashboard/student/total-student"
          className={linkClass("/state-dashboard/student/total-student")}
        >
          Total Students
        </Link>
      </div>
    )}
  </div>
    
    {/* school optiom */}
        <div>
  <button
    onClick={() => setSchoolOpen(!schoolOpen)}
    className={[
      "group relative flex items-center justify-between w-full min-h-11.5 px-3.5 rounded-xl",
      "text-[13.5px] font-semibold transition-all duration-220",
      isSchoolActive
        ? "bg-gradient-to-br from-[#17395c] to-[#1f4e7a] text-white"
        : "text-[#4a6278] hover:bg-[rgba(23,57,92,0.06)] hover:text-[#17395c]",
    ].join(" ")}
  >
    <div className="flex items-center gap-3">
      <FaSchool
        className={[
          "text-[17px] transition-all",
          isSchoolActive
            ? "text-[#f4df17]"
            : "text-[#7a8fa6] group-hover:text-[#b88d00]",
        ].join(" ")}
      />
      Schools
    </div>

    <span className="text-xs">{schoolOpen ? "▲" : "▼"}</span>
  </button>

  {schoolOpen && (
    <div className="ml-8 mt-1 space-y-1">
  
      <Link
        href="/state-dashboard/school/total-school"
        className={linkClass("/state-dashboard/school/total-school")}
      >
        Total Schools
      </Link>
    </div>
  )}
</div>
        
      </nav>

      <NavDivider />

      <SectionTitle label="Security" />
      <Link href="/state-dashboard/state-update-password" className={linkClass("/state-dashboard/state-update-  password")}>
        <FaKey className={iconClass("/state-dashboard/state-update-password")} />
         Update Password 
      </Link>

      <NavDivider />

      <SectionTitle label="Profile" />
      <nav className="space-y-1">
        <Link href="/state-dashboard/state-edit-profile" className={linkClass("/state-dashboard/state-edit-profile")}>
          <FaUser className={iconClass("/state-dashboard/state-edit-profile")} />
          View Profile
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[#4a6278] text-[13.5px] font-semibold hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shine {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sidebarIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .sidebar-animate  { animation: sidebarIn  0.45s cubic-bezier(.22,1,.36,1) both; }
        .content-animate  { animation: fadeSlideIn 0.45s cubic-bezier(.22,1,.36,1) 0.08s both; }
        .shine-name {
          background: linear-gradient(90deg, #162a4a 0%, #1f6fa3 40%, #f4df17 60%, #162a4a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }
      `}</style>

      <div
        className="min-h-[150vh]"
        style={{
          background:
            "linear-gradient(135deg, #e8eef6 0%, #dce7f3 40%, #eaf0f8 70%, #d8e6f2 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 12s ease infinite",
        }}
      >
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #17395c18 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* MOBILE HEADER */}
        <header className="md:hidden fixed top-0 left-0 w-full z-60 bg-white border-b border-[#e6edf5] shadow-sm">
          <div
            className="absolute top-0 left-0 w-full h-0.5"
            style={{
              background:
                "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
            }}
          />
          <div className="flex items-center justify-between px-4 h-14">
            <h2 className="text-[15px] font-bold text-[#17395c] tracking-tight">
              Dashboard
            </h2>

            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-[15px] shadow-md"
              style={{
                background: "linear-gradient(135deg, #17395c, #1f4e7a)",
              }}
            >
              {name.charAt(0).toUpperCase()}
            </button>
          </div>
        </header>

        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={[
            "md:hidden fixed top-0 left-0 h-full w-72 z-50 overflow-y-auto",
            "transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <SidebarContent />
        </aside>

        <div className="relative container mx-auto px-4 pt-16 md:pt-6 pb-10">
          <div className="flex gap-5 items-start">

            <aside className="sidebar-animate hidden md:block sticky top-6 w-72 xl:w-75 shrink-0 overflow-y-auto rounded-3xl bg-white shadow">
              <SidebarContent />
            </aside>

            <main className="content-animate flex-1 min-w-0 rounded-3xl bg-white shadow">
              <div className="p-8 min-h-[150vh]">{children}</div>
            </main>

          </div>
        </div>
      </div>
    </>
  );
}