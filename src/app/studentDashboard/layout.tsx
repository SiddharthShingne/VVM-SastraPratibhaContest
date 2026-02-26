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
    <div className="min-h-screen bg-[#f6f7fb] py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* SIDEBAR */}
        <aside className="bg-white border-2 border-[#7c6cff] rounded-lg p-6 shadow-sm">

          {/* USER INFO */}
          <div className="mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Welcome
            </p>

            <div className="mt-3 text-sm text-gray-700 font-medium uppercase">
              {username}
            </div>
          </div>

          {/* DASHBOARD */}
          <div className="mb-6">
            <Link href="/studentDashboard" className={linkClass("/studentDashboard")}>
              <FaHome className="text-xs" />
              Dashboard
             {/* <DashboardHome /> */}
            </Link>
          </div>

          {/* RESULT SECTION */}
          <div className="mb-6">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">
              Result
            </p>

            <div className="space-y-2">
              <Link
                href="/studentDashboard/level1-result"
                className={linkClass("/studentDashboard/level1-result")}
              >
                <FaTrophy className="text-xs" />
                Level 1 Result
              </Link>

              <div className="border-t my-2" />

              <Link
                href="/studentDashboard/level2-result"
                className={linkClass("/studentDashboard/level2-result")}
              >
                <FaTrophy className="text-xs" />
                Level 2 Result
              </Link>

              <Link
                href="/studentDashboard/download-apps"
                className={linkClass("/studentDashboard/download-apps")}
              >
                <FaDownload className="text-xs" />
                Download Apps
              </Link>

              <div className="border-t my-2" />

              <Link
                href="/studentDashboard/level2-exam-sif"
                className={linkClass("/studentDashboard/level2-exam-sif")}
              >
                <FaFileAlt className="text-xs" />
                Level 2 Exam SIF
              </Link>
            </div>
          </div>

          {/* STUDY MATERIAL */}
          <div className="mb-6">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">
              Study Material
            </p>

            <div className="space-y-2">
              <Link
                href="/studentDashboard/study-material"
                className={linkClass("/studentDashboard/study-material")}
              >
                <FaBook className="text-xs" />
                Study Material
              </Link>

              <div className="border-t my-2" />

              <Link
                href="/studentDashboard/contact"
                className={linkClass("/studentDashboard/contact")}
              >
                <FaInfoCircle className="text-xs" />
                Contact Information
              </Link>
            </div>
          </div>

          {/* PROFILE */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">
              Profile
            </p>

            <div className="space-y-2">
              <Link
                href="/studentDashboard/edit-profile"
                className={linkClass("/studentDashboard/edit-profile")}
              >
                <FaUserCog className="text-xs" />
                Edit Profile
              </Link>

              <div className="border-t my-2" />

              <Link
                href="/studentDashboard/update-password"
                className={linkClass("/studentDashboard/update-password")}
              >
                <FaKey className="text-xs" />
                Update Student Password
              </Link>

              <div className="border-t my-2" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-red-600 transition"
              >
                <FaSignOutAlt className="text-xs" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="md:col-span-3 bg-white rounded-lg shadow-sm p-8">
          {children}
        </main>
      </div>
    </div>
  );
}