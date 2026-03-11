/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import {
//   FaUserCircle,
//   FaBook,
//   FaSignOutAlt,
//   FaRegEdit,
//   FaKey,
//   FaFileAlt,
// } from "react-icons/fa";

// export default function StudentDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const username =
//     typeof window !== "undefined"
//       ? localStorage.getItem("username") || "Student"
//       : "Student";

//   useEffect(() => {
//     if (!token) {
//       router.replace("/login");
//     }
//   }, [token, router]);

//   if (!token) return null;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     router.replace("/login");
//   };

//   const navItems = [
//     { href: "/studentDashboard", label: "Dashboard" },
//     { href: "/studentDashboard/level1-result", label: "Level 1 Result" },
//     { href: "/studentDashboard/level2-result", label: "Level 2 Result" },
//     { href: "/studentDashboard/download-apps", label: "Download Apps" },
//     { href: "/studentDashboard/level2-exam-sif", label: "Level 2 Exam SIF" },
//     { href: "/studentDashboard/study-material", label: "Study Material" },
//     { href: "/studentDashboard/contact", label: "Contact Information" },
//     { href: "/studentDashboard/edit-profile", label: "Edit Profile" },
//     { href: "/studentDashboard/update-password", label: "Update Password" },
//   ];

//   return (
//     <div className="min-h-screen bg-white py-10">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

//         {/* SIDEBAR */}
//         <aside className="bg-white border border-[#c9b6f2] rounded-lg shadow-sm p-6">

//           <div className="mb-6">
//             <p className="text-xs text-gray-400 uppercase tracking-wide">
//               Welcome
//             </p>

//             <div className="flex items-center gap-3 mt-3">
//               <div className="w-9 h-9 rounded-full bg-[#5b4dd6] flex items-center justify-center text-white text-sm font-semibold">
//                 {username.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <div className="text-sm font-medium">{username}</div>
//                 <div className="text-xs text-gray-500">
//                   Student Dashboard
//                 </div>
//               </div>
//             </div>
//           </div>

//           <nav className="space-y-2 text-sm">
//             {navItems.map((item, index) => (
//               <Link
//                 key={index}
//                 href={item.href}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
//                   pathname === item.href
//                     ? "bg-[#e6e9ff] text-[#4c48c9] font-medium"
//                     : "text-gray-600 hover:bg-[#f1f2ff] hover:text-[#4c48c9]"
//                 }`}
//               >
//                 <FaFileAlt className="text-xs" />
//                 {item.label}
//               </Link>
//             ))}

//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600"
//             >
//               <FaSignOutAlt className="text-xs" />
//               Logout
//             </button>
//           </nav>
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="md:col-span-3">{children}</main>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaHome,
  FaTrophy,
  FaDownload,
  FaFileAlt,
  FaBook,
  FaInfoCircle,
  FaUserCog,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuthService } from "@/services/authService";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthService();

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
      await logout(); // call API

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("studentname");

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }; const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition ${isActive(href)
      ? "text-[#4c48c9] font-medium"
      : "text-gray-500 hover:text-[#4c48c9]"
    }`;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0f2fa] to-[#e9ecf7] py-6">
      <div className="max-w-full mx-auto px-2 sm:px-3 lg:px-4 grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* SIDEBAR */}
        <aside className="bg-white rounded-lg shadow-md border border-[#7F7BDA] p-3 sticky top-5 h-fit">

          {/* USER INFO */}
          <div className="mb-5 mt-1">
            <p className="text-[9px] font-semibold text-[#7F7BDA] uppercase tracking-wider">
              Welcome Back
            </p>

            <div className="mt-1 text-[11px] font-semibold text-gray-800 uppercase tracking-wide">
              {username || "Student"}
            </div>

            <div className="text-[9px] text-gray-500">
              {studentname || "Student ID"}
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-3">
            <Link
              href="/studentDashboard"
              className={linkClass("/studentDashboard")}
            >
              <FaHome className="text-[11px]" />
              Dashboard
            </Link>

            <Link
              href="/studentDashboard/level1-result"
              className={linkClass("/studentDashboard/level1-result")}
            >
              <FaTrophy className="text-[11px]" />
              Level 1 Result
            </Link>

            <Link
              href="/studentDashboard/level2-result"
              className={linkClass("/studentDashboard/level2-result")}
            >
              <FaTrophy className="text-[11px]" />
              Level 2 Result
            </Link>

            <Link
              href="/studentDashboard/download-app"
              className={linkClass("/studentDashboard/download-app")}
            >
              <FaDownload className="text-[11px]" />
              Download Apps
            </Link>

            <Link
              href="/studentDashboard/study-material"
              className={linkClass("/studentDashboard/study-material")}
            >
              <FaBook className="text-[11px]" />
              Study Material
            </Link>

            <Link
              href="/studentDashboard/contact"
              className={linkClass("/studentDashboard/contact")}
            >
              <FaInfoCircle className="text-[11px]" />
              Contact Information
            </Link>

            <Link
              href="/studentDashboard/edit-profile"
              className={linkClass("/studentDashboard/edit-profile")}
            >
              <FaUserCog className="text-[11px]" />
              Edit Profile
            </Link>

            <Link
              href="/studentDashboard/update-password"
              className={linkClass("/studentDashboard/update-password")}
            >
              <FaKey className="text-[11px]" />
              Update Password
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-1.5 px-2 py-1 text-[11px] text-gray-500 hover:text-white hover:bg-red-500 rounded-md transition-all"
            >
              <FaSignOutAlt className="text-[11px]" />
              Logout
            </button>
          </nav>

          <div className="mt-5 pt-3 border-t border-gray-100">
            <p className="text-[8px] text-gray-400 text-center">
              © 2026 Student Portal
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 min-h-80">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}