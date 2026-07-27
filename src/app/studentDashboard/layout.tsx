/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import FeeStructure from "@/components/registration/FeeStructure";
import StudentAwards from "@/components/examDetails/StudentAwards";
import {
  FaHome,
  FaDownload,
  FaPhone,
  FaUserCog,
  FaKey,
  FaSignOutAlt,
  FaTimes,
  FaClock,
  FaMoneyBillWave,
  FaAward,
  FaInfoCircle, // ← ADD THIS LINE
  FaBook, // ← ADD THIS LINE
} from "react-icons/fa";

import { logoutUser } from "@/services/authService";
import axiosInstance from "@/services/axiosInstance";
import { useSessionTimeout } from "@/components/shared/useSessionTimeout";
function extractNameFromStorage(): string {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "Student";
    const user = JSON.parse(raw);
    return (
      user?.user?.user_detail?.name || user?.user_detail?.name || "Student"
    );
  } catch (err) {
    console.error("extractNameFromStorage error:", err);
    return "Student";
  }
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mt-7 mb-2 ml-0.5">
      <div
        className="w-0.75 h-3 rounded-sm shrink-0"
        style={{ background: "linear-gradient(180deg, #17395c, #f4df17)" }}
      />

      <span className="text-[11.5px] font-extrabold text-[#5a7089] uppercase tracking-[1.4px]">
        {label}
      </span>
      {/* <span className="text-[10.5px] font-extrabold text-[#7a90a8] uppercase tracking-[1.1px]">
        {label}
      </span> */}
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

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showDialog, confirmLogout } = useSessionTimeout();
  const router = useRouter();
  const pathname = usePathname();
  const [navbarHeight, setNavbarHeight] = useState(64);
  const [studentName, setStudentName] = useState(() => {
    if (typeof window !== "undefined") return extractNameFromStorage();
    return "Student";
  });

  const [token, setToken] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Add this after your existing useState hooks
  const [showNotice, setShowNotice] = useState(true); // Always show on page load

  const handleDismissNotice = () => {
    setShowNotice(false); // Only hides until next refresh
    // No localStorage - so it will show again after refresh
  };
  // const handleDismissNotice = () => {
  //   setShowNotice(false);
  //   localStorage.setItem("hidePaymentNotice", "true");
  // };
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token === null) return;
    if (!token) router.replace("/Login");
  }, [token, router]);

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
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

  // ESC key close (pro UX)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // In your dashboard layout, change the measure useEffect to this:
  // useEffect(() => {
  //   const measure = () => {
  //     const navbar = document.getElementById("global-navbar");
  //     const announcement = document.getElementById("announcement-bar");
  //     const navH = navbar?.getBoundingClientRect().height ?? 64;
  //     const annH = announcement?.getBoundingClientRect().height ?? 0;
  //     setNavbarHeight(navH + annH);
  //   };

  //   measure();

  //   // Run multiple times to catch late renders
  //   const t1 = setTimeout(measure, 100);
  //   const t2 = setTimeout(measure, 500);
  //   const t3 = setTimeout(measure, 1000);

  //   window.addEventListener("resize", measure);
  //   return () => {
  //     clearTimeout(t1);
  //     clearTimeout(t2);
  //     clearTimeout(t3);
  //     window.removeEventListener("resize", measure);
  //   };
  // }, []);

  useEffect(() => {
    const measure = () => {
      const navbar = document.getElementById("global-navbar");
      const announcement = document.getElementById("announcement-bar");

      // getBoundingClientRect().bottom — scroll ke saath change hoti hai
      // isliye dono ka current bottom lo (jo abhi viewport mein dikhta hai)
      const navBottom = navbar?.getBoundingClientRect().bottom ?? 64;

      // Agar negative ya zero ho (scroll ho gaya) toh 0 lo
      const finalHeight = Math.max(0, navBottom);

      setNavbarHeight(finalHeight);
    };

    measure();
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 500);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true }); // ← YE ADD KAR

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure); // ← YE BHI
    };
  }, []);

  const [noticeHeight, setNoticeHeight] = useState(0);

  useEffect(() => {
    const measureNotice = () => {
      const notice = document.getElementById("payment-notice-banner");
      if (notice) {
        setNoticeHeight(notice.getBoundingClientRect().height);
      }
    };

    measureNotice();
    const timer = setTimeout(measureNotice, 100);
    window.addEventListener("resize", measureNotice);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measureNotice);
    };
  }, [showNotice]);

  const getTopOffset = (baseOffset: number) => {
    return baseOffset + (showNotice ? noticeHeight : 0);
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed, forcing logout", error);
    } finally {
      // Clear all auth data
      localStorage.clear();
      sessionStorage.clear();
      delete axiosInstance.defaults.headers.common["Authorization"];

      // Clear the token state
      setToken(null);

      // Use setTimeout to ensure state updates are processed
      setTimeout(() => {
        window.dispatchEvent(new Event("auth-change"));
        router.replace("/Login");
        router.refresh(); // Force refresh in Next.js 13+
      }, 100);
    }
  };

  const isActive = (path: string) => pathname === path;

  // const linkClass = (path: string) =>
  //   [
  //     "group relative flex items-center gap-3 min-h-11.5 px-3.5 rounded-xl",
  //     "text-[13.5px] font-semibold no-underline cursor-pointer",
  //     "transition-all duration-220 ease-out overflow-hidden",
  //     isActive(path)
  //       ? "bg-gradient-to-br from-[#17395c] to-[#1f4e7a] text-white border border-white/20 shadow-[0_8px_24px_rgba(23,57,92,0.30),inset_0_1px_0_rgba(255,255,255,0.18)]"
  //       : "text-[#4a6278] border border-transparent hover:bg-[rgba(23,57,92,0.06)] hover:border-[#d0dde9] hover:text-[#17395c] hover:shadow-[0_4px_12px_rgba(23,57,92,0.08)]",
  //   ].join(" ");


  const linkClass = (path: string) =>
    [
      "group relative flex items-center gap-3 min-h-12 px-4 py-3 rounded-2xl",
      "text-[13.5px] font-semibold no-underline cursor-pointer",
      "transition-all duration-220 ease-out overflow-hidden",
      isActive(path)
        ? "bg-[#17395c]/[0.06] text-[#17395c] border-l-[3px] border-[#17395c] shadow-[0_2px_8px_rgba(23,57,92,0.08)]"
        : "text-[#4a6278] border-l-[3px] border-transparent hover:bg-[rgba(23,57,92,0.06)] hover:text-[#17395c] hover:scale-[1.01]",
    ].join(" ");

  const iconClass = (path: string) => 
    [
      "text-[17px] w-5 shrink-0 transition-all duration-220",
      isActive(path)
        ? "text-[#f4df17]"
        : "text-[#7a8fa6] group-hover:text-[#b88d00] group-hover:scale-110 group-hover:-rotate-3",
    ].join(" ");

  if (token === null || !token) return null;

  // Sidebar inner content — shared between mobile and desktop
  // const SidebarContent = () => (
  const SidebarContent = ({ idPrefix }: { idPrefix: string }) => (
    <div className="px-5 pb-6 pt-8">
      {/* USER HEADER */}
      {/* <div className="text-center pb-5 mb-3 border-b border-[#eef2f7]">
        <div
          className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-black text-[18px] shadow-md transition-transform duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)",
          }}
        >
          {studentName.charAt(0).toUpperCase()}
        </div>
        <p className="text-[10px] text-[#8fa2b8] uppercase font-bold mb-1 tracking-wide">
          Welcome back
        </p>
        <h6 className="shine-name text-[17px] font-extrabold">
          {studentName.toLocaleUpperCase()}
        </h6>
        
      </div> */}

      <div className="text-center pb-5 mb-3 border-b border-[#eef2f7]">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ background: "linear-gradient(135deg, #17395c, #f4df17)" }}
          />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-md transition-transform duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)",
            }}
          >
            {studentName.charAt(0).toUpperCase()}
          </div>
        </div>
        <p className="text-[10px] text-[#8fa2b8] uppercase font-bold mb-1 tracking-wide">
          Welcome back 👋
        </p>
        <h6 className="shine-name text-[17px] font-extrabold">
          {studentName.toLocaleUpperCase()}
        </h6>
        <span className="inline-block text-[10px] font-bold text-[#8a6d00] bg-[#f4df17]/60 px-3 py-1 rounded-full mt-1.5">
          Student
        </span>
        {/* <p className="text-[11px] text-[#a0b2c4] font-semibold mt-0.5">Student</p> */}
      </div>

      <nav className="space-y-1">
        <Link
          href="/studentDashboard"
          className={linkClass("/studentDashboard")}
        >
          <FaHome className={iconClass("/studentDashboard")} />
          Dashboard
        </Link>
        <Link
          href="/studentDashboard/download-app"
          className={linkClass("/studentDashboard/download-app")}
        >
          <FaDownload className={iconClass("/studentDashboard/download-app")} />
          Download Apps
        </Link>
      </nav>

      <NavDivider />
      {/* <SectionTitle label="Contact" />
      <Link
        href="/studentDashboard/contact"
        className={linkClass("/studentDashboard/contact")}
      >
        <FaPhone className={iconClass("/studentDashboard/contact")} />
        Contact Information
      </Link> */}
      <SectionTitle label="Syllabus & Study Material" />

      <Link
        href="/studentDashboard/syllabus"
        className={linkClass("/studentDashboard/syllabus")}
      >
        <FaBook className={iconClass("/studentDashboard/syllabus")} />
        Syllabus
      </Link>
      <Link
        href="/studentDashboard/Study-Material"
        className={linkClass("/studentDashboard/Study-Material")}
      >
        <BookOpen
          size={17}
          className={iconClass("/studentDashboard/Study-Material")}
        />
        Study Material
      </Link>

      <SectionTitle label="exam details" />
      
      <Link
        href="/studentDashboard/fee-structure"
        className={linkClass("/studentDashboard/fee-structure")}
      >
        <FaMoneyBillWave className={iconClass("/studentDashboard/fee-structure")} />
        Fee Structure
      </Link>

      <Link
        href="/studentDashboard/student-awards"
        className={linkClass("/studentDashboard/student-awards")}
      >
        <FaAward className={iconClass("/studentDashboard/student-awards")} />
        Awards Section
      </Link>

      {/* <NavDivider /> */}
      <SectionTitle label="Profile" />

      <nav className="space-y-1">
        <Link
          href="/studentDashboard/edit-profile"
          className={linkClass("/studentDashboard/edit-profile")}
        >
          <FaUserCog className={iconClass("/studentDashboard/edit-profile")} />
          Edit Profile
        </Link>
        <Link
          href="/studentDashboard/update-password"
          className={linkClass("/studentDashboard/update-password")}
        >
          <FaKey className={iconClass("/studentDashboard/update-password")} />
          Update Password
        </Link>
        
        {/* <NavDivider />
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[#4a6278] text-[13.5px] font-semibold hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav> */}

        <NavDivider />
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[#4a6278] text-[13.5px] font-semibold hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>

      {/* Bottom illustration */}
      <div className="mt-10 flex justify-center opacity-95 pointer-events-none select-none illustration-float">
        <svg
          width="110"
          height="110"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Graduation cap on books"
        >
          <defs>
            <filter id={`${idPrefix}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#17395c" floodOpacity="0.20" />
            </filter>
            <linearGradient id={`${idPrefix}-bookBlue`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2C5A96" />
              <stop offset="100%" stopColor="#17395c" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-bookGold`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE070" />
              <stop offset="100%" stopColor="#F4C817" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-capTop`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2C5A96" />
              <stop offset="100%" stopColor="#17395c" />
            </linearGradient>
          </defs>

          <ellipse cx="70" cy="118" rx="34" ry="6" fill="#17395c" opacity=".10" />

          <path d="M26 100 C16 92 15 79 28 73 C36 84 34 96 26 100Z" fill="#F4C817" opacity=".55" />
          <path d="M33 111 C23 103 23 91 36 86 C43 96 41 107 33 111Z" fill="#17395c" opacity=".12" />
          <path d="M114 101 C124 93 125 80 112 74 C104 85 106 97 114 101Z" fill="#F4C817" opacity=".55" />
          <path d="M107 112 C117 104 117 92 104 87 C97 97 99 108 107 112Z" fill="#17395c" opacity=".12" />

          <g filter={`url(#${idPrefix}-shadow)`}>
            <rect x="40" y="92" width="60" height="12" rx="3" fill={`url(#${idPrefix}-bookGold)`} />
            <rect x="36" y="82" width="68" height="12" rx="3" fill={`url(#${idPrefix}-bookBlue)`} />
            <rect x="42" y="72" width="56" height="12" rx="3" fill="#ffffff" />
          </g>

          <g filter={`url(#${idPrefix}-shadow)`} transform="rotate(-8 70 55)">
            <polygon points="70,32 108,50 70,66 32,50" fill={`url(#${idPrefix}-capTop)`} />
            <path d="M46 54V68C46 74 57 79 70 79C83 79 94 74 94 68V54L70 66L46 54Z" fill="#28568F" />
            <line x1="108" y1="50" x2="108" y2="70" stroke="#F4C817" strokeWidth="2.5" />
            <circle cx="108" cy="50" r="3.5" fill="#F4C817" />
            <circle cx="108" cy="72" r="3.5" fill="#F4C817" />
          </g>

          <circle cx="30" cy="26" r="1.8" fill="#F4C817" opacity=".7" />
          <circle cx="112" cy="24" r="2" fill="#17395c" opacity=".18" />
          <circle cx="118" cy="34" r="1.3" fill="#F4C817" />
          <circle cx="22" cy="38" r="1.2" fill="#17395c" opacity=".18" />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Global keyframes ── */}
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

      {showDialog && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative w-[90vw] max-w-sm mx-auto rounded-2xl p-6 shadow-2xl bg-white"
            style={{ border: "1px solid rgba(23,57,92,0.12)" }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
              }}
            />

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-md"
              style={{
                background: "linear-gradient(135deg, #17395c, #1f4e7a)",
              }}
            >
              <FaClock />
            </div>

            <h3 className="text-center text-[17px] font-extrabold text-[#17395c] mb-1">
              Session Expired
            </h3>
            <p className="text-center text-[13px] text-[#7a90a8] mb-6 leading-relaxed">
              You have been inactive for 1 hour and have been automatically
              logged out for security.
            </p>

            <button
              onClick={confirmLogout}
              className="w-full py-2.5 rounded-xl text-white text-[13.5px] font-semibold shadow-md transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #17395c, #1f4e7a)",
              }}
            >
              OK, Go to Login
            </button>
          </div>
        </div>
      )}

      {/* {showNotice && (
        <div
          id="payment-notice-banner"
          className="notice-slide-down fixed left-0 right-0 z-[70] bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-b border-amber-200 shadow-sm"
          style={{
            top: `${navbarHeight}px`,
          }}
        >
          <div className="relative max-w-7xl mx-auto px-4 py-3 md:py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 flex-shrink-0">
                  <FaInfoCircle className="text-amber-600 text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-800 text-sm md:text-base font-medium leading-tight">
                    <span className="font-bold">Payment Notice:</span>{' '}
                    <span className="text-amber-700">
                      Payment functionality is currently unavailable. We are working on enabling this feature and will notify you once it's ready.
                    </span>
                  </p>
                  <p className="text-amber-600 text-xs md:text-sm mt-0.5 hidden sm:block">
                    Thank you for your patience and understanding.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleDismissNotice}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-all duration-200 whitespace-nowrap"
                  aria-label="Dismiss notice"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* ── Page shell ── */}
      <div className="min-h-screen ">
        <div
          className=" fixed inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, #e8eef6 0%, #dce7f3 40%, #eaf0f8 70%, #d8e6f2 100%)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 12s ease infinite",
          }}
        />
        {/* dot-grid texture */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #17395c18 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="fixed top-10 right-20 w-96 h-96 rounded-full bg-[#17395c]/5 blur-[140px] pointer-events-none -z-10" />
        <div className="fixed bottom-20 left-0 w-80 h-80 rounded-full bg-[#f4df17]/10 blur-[120px] pointer-events-none -z-10" />

        {/* ─────────────────────────────────────────────────
            MOBILE TOP HEADER — structured navbar
        ───────────────────────────────────────────────── */}
        <header
          className="md:hidden fixed left-0 w-full z-[60] bg-white border-b border-[#e6edf5] shadow-sm"
          style={{ top: navbarHeight }}
        >
          <div
            className="absolute top-0 left-0 w-full h-0.5"
            style={{
              background:
                "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
            }}
          />
          <div className="flex items-center justify-between px-4 h-14">
            {/* LEFT: page title */}
            <h2 className="text-[15px] font-bold text-[#17395c] tracking-tight">
              Dashboard
            </h2>

            {/* RIGHT: profile avatar — opens sidebar */}
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Open menu"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-[15px] shadow-md 
              transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #17395c, #1f4e7a)",
              }}
            >
              {studentName.charAt(0).toUpperCase()}
            </button>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────
            OVERLAY — outside <aside>, correct stacking (z-40)
        ───────────────────────────────────────────────── */}
        {isMobile && sidebarOpen && (
          <div
            style={{ top: navbarHeight + 56 }}
            className="fixed left-0 right-0 bottom-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ─────────────────────────────────────────────────
            MOBILE SIDEBAR — fixed, slides in from left (z-50)
        ───────────────────────────────────────────────── */}
        <aside
          className={[
            "md:hidden fixed left-0 w-72 z-50 overflow-y-auto",
            "transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          style={{
            top: navbarHeight + 56, // navbar + dashboard header
            height: `calc(100vh - ${navbarHeight + 56}px)`,
            background: "linear-gradient(180deg, #ffffff, #fbfcfe)",
            // background: "#ffffff",
            boxShadow:
              "4px 0 24px rgba(23,57,92,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* accent bar */}
          <div
            className="absolute top-0 left-0 w-full h-0.5"
            style={{
              background:
                "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
            }}
          />

          {/* Close button row */}
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
            <span className="text-[11px] font-extrabold text-[#7a90a8] uppercase tracking-widest">
              Menu
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#4a6278] hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            >
              <FaTimes size={15} />
            </button>
          </div>

          <SidebarContent idPrefix={""} />
        </aside>

        {/* ─────────────────────────────────────────────────
            DESKTOP LAYOUT
            pt-16 on mobile clears fixed header; md:pt-6 = desktop
        ───────────────────────────────────────────────── */}
        <div
          className="relative w-full max-w-7xl mx-auto px-4 md:pt-6 pb-10"
          style={{
            paddingTop: isMobile ? `${navbarHeight + 56}px` : undefined,
          }}
        >
          <div className="flex gap-5 items-start ">
            {/* ── DESKTOP SIDEBAR — hidden on mobile, sticky in flex ── */}
            <aside
              className="hidden md:block w-72 xl:w-75 shrink-0 rounded-3xl"
              style={{
                position: "sticky",
                top: `${navbarHeight + 16}px`,
                maxHeight: `calc(100vh - ${navbarHeight + 32}px)`,
                overflowY: "auto",
                alignSelf: "flex-start",
                background: "linear-gradient(180deg, #ffffff, #fbfcfe)",
                // background: "#ffffff",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.55)",
                boxShadow:
                  "0 10px 30px rgba(23,57,92,0.10), 0 2px 8px rgba(23,57,92,0.08)",
              }}
            >
              {/* accent bar */}
              <div
                className="absolute top-0 left-0 w-full h-0.75 rounded-t-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
                }}
              />
              <SidebarContent idPrefix={""} />
            </aside>

            {/* ── MAIN CONTENT — flex-1 fills space after sidebar ── */}
            <main
              className="relative w-full px-4  md:pt-6 pb-10 content-animate rounded-3xl"
              style={{
                background:
                  "linear-gradient(145deg, #f9fbfd 0%, #ffffff 60%, #f4f8fc 100%)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(23,57,92,0.09)",
                boxShadow:
                  "0 8px 32px rgba(23,57,92,0.10), 0 1px 4px rgba(23,57,92,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <div className="p-6 md:p-8">{children}</div>
              {/* <div className="p-8">{children}</div>
               */}
            </main>
          </div>
        </div>
      </div>

      {/* ── LOGOUT CONFIRMATION DIALOG ── */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-200 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 "
            onClick={() => setShowLogoutDialog(false)}
          />
          {/* Dialog card */}
          <div
            className="relative z-10 w-[90vw] max-w-sm mx-auto rounded-2xl p-6 shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #ffffff, #f4f8fc)",
              border: "1px solid rgba(23,57,92,0.12)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
              }}
            />

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-md"
              style={{
                background: "linear-gradient(135deg, #c0392b, #e74c3c)",
              }}
            >
              <FaSignOutAlt />
            </div>

            <h3 className="text-center text-[17px] font-extrabold text-[#17395c] mb-1">
              Confirm Logout
            </h3>
            <p className="text-center text-[13px] text-[#7a90a8] mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#d0dde9] text-[#4a6278] text-[13.5px] font-semibold hover:bg-[#f0f4f8] transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutDialog(false);
                  handleLogout();
                }}
                className="flex-1 py-2.5 rounded-xl text-white text-[13.5px] font-semibold transition-all duration-200 hover:opacity-90 shadow-md"
                style={{
                  background: "linear-gradient(135deg, #c0392b, #e74c3c)",
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── PAYMENT NOTICE BANNER ── */}
    </>
  );
}
