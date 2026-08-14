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
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import { useSessionTimeout } from "@/components/shared/useSessionTimeout";
import { logoutUser } from "@/services/authService";
import axiosInstance from "@/services/axiosInstance";

/* ---------------- GET NAME ---------------- */
function extractNameFromStorage(): string {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "State Coordinator";
    const parsed = JSON.parse(raw);
    return (
      parsed?.user?.user_detail?.name ||
      parsed?.user_detail?.name ||
      "State Coordinator"
    );
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


  const { showDialog, confirmLogout } = useSessionTimeout(); // ← destructure
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState(() => {

    if (typeof window !== "undefined") return extractNameFromStorage();
    return "State Coordinator";
  });
  const [countryCode, setCountryCode] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);

  // ── ADDED: dynamic navbar height ──
  const [navbarHeight, setNavbarHeight] = useState(64);
  const [showNotice, setShowNotice] = useState(true);
  const isSchoolActive = pathname.startsWith("/state-dashboard/school");
  const isStudentActive = pathname.startsWith("/state-dashboard/student");

  const handleDismissNotice = () => {
    setShowNotice(false);  // Only hides until next refresh
    // No localStorage - so it will show again after refresh
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));

    const raw = localStorage.getItem("user");

    if (raw) {
      const parsed = JSON.parse(raw);

      // YOUR COUNTRY CODE
      const code = parsed?.user?.country_code || "";

      setCountryCode(code);

      console.log("Coordinator Country:", code);
    }
  }, []);
  useEffect(() => {
    if (token === null) return;
    if (!token) router.replace("/login");
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ── ADDED: measure useEffect (from student dashboard) ──
  useEffect(() => {
    const measure = () => {
      const navbar = document.getElementById("global-navbar");
      const navBottom = navbar?.getBoundingClientRect().bottom ?? 64;
      const finalHeight = Math.max(0, navBottom);

      // ── CHANGED: write to CSS var directly, no setState ──
      document.documentElement.style.setProperty("--navbar-h", `${finalHeight}px`);
      setNavbarHeight(finalHeight); // keep for initial layout only
    };

    measure();
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 500);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();

      delete axiosInstance.defaults.headers.common["Authorization"];

      setToken(null); // ✅ layout ko turant update karega

      window.dispatchEvent(new Event("auth-change")); // ✅ header sync
      router.replace("/login");
    }
  };

  const permissions = {
    canViewPayments: ["AE", "SA", "OM", "KW", "BH"].includes(countryCode),

    canBulkImport: ["AE", "SA", "OM", "KW", "BH"].includes(countryCode),

    canViewSchools: ["AE", "SA", "OM", "QA", "KW", "BH"].includes(countryCode),

    canViewStudents: countryCode === "AE",
  }; 

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    [
      "group relative flex items-center gap-3 [min-height:2.875rem] px-3.5 rounded-xl",
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
      {/* USER HEADER */}
      <div className="text-center pb-5 mb-3 border-b border-[#eef2f7]">
        <div
          className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-black text-[18px] shadow-md transition-transform duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)" }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <p className="text-[10px] text-[#8fa2b8] uppercase font-bold mb-1 tracking-wide">
          State Coordinator
        </p>
        <h6 className="shine-name text-[17px] font-extrabold">
          {name}
        </h6>
      </div>

      {/* NAV */}
      <nav className="space-y-1">
        <Link href="/state-dashboard" className={linkClass("/state-dashboard")}>
          <FaHome className={iconClass("/state-dashboard")} />
          Dashboard
        </Link>

        {/* Students dropdown */}
        <div>
          <button
            onClick={() => setStudentOpen(!studentOpen)}
            className={[
              "group relative flex items-center justify-between w-full min-h-11.5 px-3.5 rounded-xl",
              "text-[13.5px] font-semibold transition-all duration-220",
              isStudentActive
                ? "bg-linear-to-br from-[#17395c] to-[#1f4e7a] text-white border border-white/20 shadow-[0_8px_24px_rgba(23,57,92,0.30)]"
                : "text-[#4a6278] border border-transparent hover:bg-[rgba(23,57,92,0.06)] hover:border-[#d0dde9] hover:text-[#17395c]",
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
              {permissions.canBulkImport && (
                <Link
                  href="/state-dashboard/student/student-bulk-import"
                  className={linkClass("/state-dashboard/student/student-bulk-import")}
                >
                  Students Bulk Import
                </Link>)}

              
              {permissions.canViewStudents && (
                <Link
                  href="/state-dashboard/student/view-indivisual-student"
                  className={linkClass("/state-dashboard/student/view-indivisual-student")}
                >
                  View Individual Students
                </Link>
              )}
              {permissions.canViewStudents && (
                <Link
                  href="/state-dashboard/student/total-student"
                  className={linkClass("/state-dashboard/student/total-student")}
                >
                  Total Students
                </Link>
              )}

              <Link
                href="/state-dashboard/student/new-student-registrations"
                className={linkClass("/state-dashboard/student/new-student-registrations")}
              >
                New Student Registrations 2026-27
              </Link>
              {/* {permissions.canViewPayments && (
                <Link
                  href="/state-dashboard/student/student-payment"
                  className={linkClass("/state-dashboard/student/student-payment")}
                >
                  Students Payment
                </Link>)} */}
            </div>
          )}
        </div>

        {/* Schools dropdown */}
        <div>
          <button
            onClick={() => setSchoolOpen(!schoolOpen)}
            className={[
              "group relative flex items-center justify-between w-full min-h-11.5 px-3.5 rounded-xl",
              "text-[13.5px] font-semibold transition-all duration-220",
              isSchoolActive
                ? "bg-linear-to-br from-[#17395c] to-[#1f4e7a] text-white border border-white/20 shadow-[0_8px_24px_rgba(23,57,92,0.30)]"
                : "text-[#4a6278] border border-transparent hover:bg-[rgba(23,57,92,0.06)] hover:border-[#d0dde9] hover:text-[#17395c]",
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
      <Link
        href="/state-dashboard/state-update-password"
        className={linkClass("/state-dashboard/state-update-password")}
      >
        <FaKey className={iconClass("/state-dashboard/state-update-password")} />
        Update Password
      </Link>

      <NavDivider />

      <SectionTitle label="Profile" />
      <nav className="space-y-1">
        <Link
          href="/state-dashboard/state-edit-profile"
          className={linkClass("/state-dashboard/state-edit-profile")}
        >
          <FaUser className={iconClass("/state-dashboard/state-edit-profile")} />
          View Profile
        </Link>

        <button
          onClick={() => setShowLogoutDialog(true)}
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
              style={{ background: "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)" }}
            />

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-md"
              style={{ background: "linear-gradient(135deg, #17395c, #1f4e7a)" }}
            >
              <FaClock />
            </div>

            <h3 className="text-center text-[17px] font-extrabold text-[#17395c] mb-1">
              Session Expired
            </h3>
            <p className="text-center text-[13px] text-[#7a90a8] mb-6 leading-relaxed">
              You have been inactive for 1 hour and have been automatically logged out for security.
            </p>

            <button
              onClick={confirmLogout}
              className="w-full py-2.5 rounded-xl text-white text-[13.5px] font-semibold shadow-md transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #17395c, #1f4e7a)" }}
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
                            Payment functionality is currently unavailable. We are working on enabling this feature and will notify you once it&#39;s ready.
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
      <div className="min-h-screen">
        <div
          className="fixed inset-0 -z-10"
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

        {/* MOBILE TOP HEADER — now uses navbarHeight */}
        <header
          className="md:hidden fixed left-0 w-full z-[80] bg-white border-b border-[#e6edf5] shadow-sm"
          style={{ top: "var(--navbar-h)" }}
        >
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
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Open menu"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-[15px] shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #17395c, #1f4e7a)" }}
            >
              {name.charAt(0).toUpperCase()}
            </button>
          </div>
        </header>

        {/* OVERLAY — now uses navbarHeight */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed left-0 right-0 bottom-0 bg-black/40 z-[75]"
            style={{ top: "calc(var(--navbar-h) + 56px)" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* MOBILE SIDEBAR — now uses navbarHeight */}
        <aside
          className={[
            "md:hidden fixed left-0 w-72 z-[90] overflow-y-auto",
            "transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          style={{
            top: "calc(var(--navbar-h) + 56px)",
            height: "calc(100vh - var(--navbar-h) - 56px)",
            background: "#ffffff",
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

          <SidebarContent />
        </aside>

        {/* DESKTOP LAYOUT — now uses navbarHeight for content padding */}
        <div
          className="relative container mx-auto px-4 md:pt-6 pb-10"
          style={{ paddingTop: isMobile ? "calc(var(--navbar-h) + 56px)" : undefined }}        >
          <div className="flex gap-5 items-start">

            {/* DESKTOP SIDEBAR */}
            <aside
              className="sidebar-animate hidden md:block w-72 xl:w-75 shrink-0 rounded-3xl"
              style={{
                position: "sticky",
                top: "calc(var(--navbar-h) + 16px)",
                maxHeight: "calc(100vh - var(--navbar-h) - 32px)",
                overflowY: "auto",
                alignSelf: "flex-start",
                background: "#ffffff",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.55)",
                boxShadow:
                  "0 10px 30px rgba(23,57,92,0.10), 0 2px 8px rgba(23,57,92,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
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
              <SidebarContent />
            </aside>

            {/* MAIN CONTENT */}
            <main
              className="content-animate flex-1 min-w-0 h-fit min-h-[60vh] rounded-3xl"
              style={{
                background: "linear-gradient(145deg, #f9fbfd 0%, #ffffff 60%, #f4f8fc 100%)",
                border: "1px solid rgba(23,57,92,0.09)",
              }}
            >
              <div className="p-8">{children}</div>
            </main>

          </div>
        </div>
      </div>

      {/* ── LOGOUT CONFIRMATION DIALOG ── */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
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
              style={{ background: "linear-gradient(135deg, #c0392b, #e74c3c)" }}
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
                style={{ background: "linear-gradient(135deg, #c0392b, #e74c3c)" }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}