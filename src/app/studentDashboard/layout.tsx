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
//             <p className="text-base text-gray-400 uppercase tracking-wide">
//               Welcome
//             </p>

//             <div className="flex items-center gap-3 mt-3">
//               <div className="w-9 h-9 rounded-full bg-[#5b4dd6] flex items-center justify-center text-white text-base font-semibold">
//                 {username.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <div className="text-base font-medium">{username}</div>
//                 <div className="text-base text-gray-500">
//                   Student Dashboard
//                 </div>
//               </div>
//             </div>
//           </div>

//           <nav className="space-y-2 text-base">
//             {navItems.map((item, index) => (
//               <Link
//                 key={index}
//                 href={item.href}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
//                   pathname === item.href
//                     ? "bg-[#e6e9ff] text-[#0d6efd] font-medium"
//                     : "text-gray-600 hover:bg-[#f1f2ff] hover:text-[#0d6efd]"
//                 }`}
//               >
//                 <FaFileAlt className="text-base" />
//                 {item.label}
//               </Link>
//             ))}

//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600"
//             >
//               <FaSignOutAlt className="text-base" />
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
import React, { useState } from "react";
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
  const [openResult, setOpenResult] = useState(false);

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
    `flex items-center gap-2 px-2 py-1.5 rounded-md text-base transition ${isActive(href)
      ? "text-[#0d6efd] font-medium"
      : "text-gray-500 hover:text-[#0d6efd]"
    }`;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0f2fa] to-[#e9ecf7] py-6 sticky">
   
       <div className="max-w-full mx-auto px-4 flex gap-6 items-start">

        {/* SIDEBAR */}
 

<div className=" p-[3px] pl-[10px] pb-[10px]rounded-xl border-color blue top-0 h-screen flex items-center justify-content-center">
<aside className="w-[300px] bg-white flex flex-col h-full rounded-xl justify content-center">
  {/* USER INFO (FIXED) */}
  <div className="p-4  pl-[10px] border-b border-gray-100">
    <p className="text-base text-[#26292f]  sanserif uppercase tracking-wider">
      Welcome   {username || "Student"}
    </p>

    {/* <div className="mt-1 text-base font-semibold text-gray-800 uppercase tracking-wide">
      {username || "Student"}
    </div> */}

    {/* <div className="text-base text-gray-500">
     
    </div> */}
  </div>

  {/* 🔥 SCROLLABLE MENU */}
  {/* <nav className="flex-1 overflow-y-auto p-4 space-y-4"> */}
    {/* <nav className="flex-1 overflow-y-scroll p-4 space-y-4">
     */}
     <nav className="flex-1 overflow-y-auto p-4 space-y-4">
      

    <Link href="/studentDashboard" className={linkClass("/studentDashboard")}>
      <FaHome className="text-base" />
      Dashboard
    </Link>

    {/* RESULT */}
    <div>
      <button
        type="button"
        onClick={() => setOpenResult(!openResult)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md text-base text-gray-500 hover:text-[#0d6efd] w-full"
      >
        <FaTrophy className="text-base" />
        Result
      </button>

      {openResult && (
        <div className="ml-6 mt-2 space-y-2">
          <Link href="/studentDashboard/level1-result" className="block text-base text-gray-500 hover:text-[#0d6efd]">
            Level 1 Result
          </Link>

          <Link href="/studentDashboard/level2-result" className="block text-base text-gray-500 hover:text-[#0d6efd]">
            Level 2 Result
          </Link>
        </div>
      )}
    </div>

    
    <Link href="/studentDashboard/download-certificate" className={linkClass("/studentDashboard/download-certificate")}>
      <FaDownload className="text-base" />
      Download Certificate
    </Link>

    <Link href="/studentDashboard/download-app" className={linkClass("/studentDashboard/download-app")}>
      <FaDownload className="text-base" />
      Download Apps
    </Link>

    <Link href="/studentDashboard/study-material" className={linkClass("/studentDashboard/study-material")}>
      <FaBook className="text-base" />
      Study Material
    </Link>

    <Link href="/studentDashboard/contact" className={linkClass("/studentDashboard/contact")}>
      <FaInfoCircle className="text-base" />
      Contact Information
    </Link>

    <Link href="/studentDashboard/edit-profile" className={linkClass("/studentDashboard/edit-profile")}>
      <FaUserCog className="text-base" />
      Edit Profile
    </Link>

    <Link href="/studentDashboard/update-password" className={linkClass("/studentDashboard/update-password")}>
      <FaKey className="text-base" />
      Update Password
    </Link>

    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-1.5 px-2 py-1 text-base text-gray-500 hover:text-white hover:bg-red-500 rounded-md transition-all"
    >
      <FaSignOutAlt className="text-base" />
      Logout
    </button>

  </nav>

  {/* FOOTER (FIXED) */}
  <div className="p-3 border-t border-gray-100">
    <p className="text-xs text-gray-400 text-center">
      © 2026 Student Portal
    </p>
  </div>
</aside>
</div>


        {/* MAIN CONTENT */}
        <main className="flex-1 border radius-20px bg-white shadow-sm border-gray-200">
        
  <div className="relative z-10 h-full overflow-y-auto p-6 ">
   
            {children}

  </div>        
    {/* </main> */}
        </main>
      </div>
    </div>
  );
}