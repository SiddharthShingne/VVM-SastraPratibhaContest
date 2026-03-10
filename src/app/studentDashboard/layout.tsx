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
import DashboardHome from "./page";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.replace("/login");
  };

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
      isActive(href)
        ? "text-[#4c48c9] font-medium"
        : "text-gray-500 hover:text-[#4c48c9]"
    }`;

  return (
 <div className="min-h-screen bg-gradient-to-br from-[#f0f2fa] to-[#e9ecf7] py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* SIDEBAR */}
    <aside className="bg-white rounded-2xl shadow-xl border-2 border-[#7F7BDA] p-6 sticky top-6 h-fit">
      {/* DECORATIVE HEADER */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#7F7BDA] to-[#E0B0DA] rounded-t-2xl"></div>
      
      {/* USER INFO */}
      <div className="mb-8 mt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-[#7F7BDA] uppercase tracking-wider">
            Welcome Back
          </p>
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D0A0CA] to-[#E0B0DA] flex items-center justify-center text-white font-bold text-lg shadow-md">
            {username?.charAt(0) || 'U'}
          </div> */}
          <div>
            <div className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              {username || 'Student Name'}
              {studentname || 'Student ID'}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION SECTIONS */}
      <nav className="space-y-8">
        {/* DASHBOARD */}
        <div>
        
          <Link 
            href="/studentDashboard" 
            className={`${linkClass("/studentDashboard")} group relative overflow-hidden`}
          >
            <span className="absolute left-0 w-1 h-0 bg-[#D0A0CA] group-hover:h-full transition-all duration-300"></span>
            <FaHome className="text-sm text-gray-400 group-hover:text-[#D0A0CA] transition-colors" />
            <span className="relative">Dashboard</span>
          </Link>
        </div>

        {/* RESULT SECTION */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#D0A0CA] rounded-full"></span>
            Results
          </p>
          <div className="space-y-1.5">
            <Link
              href="/studentDashboard/level1-result"
              className={`${linkClass("/studentDashboard/level1-result")} group`}
            >
              <FaTrophy className="text-sm text-gray-400" />
              Level 1 Result
            </Link>

            <Link
              href="/studentDashboard/level2-result"
              className={`${linkClass("/studentDashboard/level2-result")} group`}
            >
              <FaTrophy className="text-sm text-gray-400" />
              Level 2 Result
            </Link>

            <div className="border-t border-dashed border-gray-200 my-3" />

            <Link
              href="/studentDashboard/download-app"
              className={`${linkClass("/studentDashboard/download-app")} group`}
            >
              <FaDownload className="text-sm text-gray-400" />
              Download Apps
            </Link>

            <Link
              href="/studentDashboard/level2-exam-sif"
              className={`${linkClass("/studentDashboard/level2-exam-sif")} group`}
            >
              <FaFileAlt className="text-sm text-gray-400" />
              Level 2 Exam SIF
            </Link>
          </div>
        </div>

        {/* STUDY MATERIAL */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#D0A0CA] rounded-full"></span>
            Resources
          </p>
          <div className="space-y-1.5">
            <Link
              href="/studentDashboard/Study-Material"
              className={`${linkClass("/studentDashboard/Study-Material")} group`}
            >
              <FaBook className="text-sm text-gray-400"/>
              Study Material
            </Link>

            <div className="border-t border-dashed border-gray-200 my-3" />

            <Link
              href="/studentDashboard/Contact-Information"
              className={`${linkClass("/studentDashboard/Contact-Information")} group`}
            >
              <FaInfoCircle className="text-sm text-gray-400" />
              Contact Information
            </Link>
          </div>
        </div>

        {/* PROFILE */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#D0A0CA] rounded-full"></span>
            Account
          </p>
          <div className="space-y-1.5">
            <Link
              href="/studentDashboard/edit-profile"
              className={`${linkClass("/studentDashboard/edit-profile")} group`}
            >
              <FaUserCog className="text-sm text-gray-400" />
              Edit Profile
            </Link>

            <Link
              href="/studentDashboard/update-password"
              className={`${linkClass("/studentDashboard/update-password")} group`}
            >
              <FaKey className="text-sm text-gray-400" />
              Update Password
            </Link>

            <div className="border-t border-dashed border-gray-200 my-3" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl "
            >
              <FaSignOutAlt className="text-sm group-hover:rotate-180 transition-transform duration-500" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* FOOTER NOTE */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center">
          © 2026 Student Portal v2.0
        </p>
      </div>
    </aside>

    {/* MAIN CONTENT */}
    <main className="md:col-span-3">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 min-h-[600px] relative overflow-hidden">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D0A0CA]/5 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#D0A0CA]/5 to-transparent rounded-tr-full"></div>
        
        {/* CONTENT */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </main>
  </div>
</div>
  );
}