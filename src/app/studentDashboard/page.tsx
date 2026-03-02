<<<<<<< HEAD
"use client";

import { useState } from "react";
import DownloadApp from "./download-app/page";
import EditProfile from "./edit-profile/page";

export default function DashboardPage() {
    const [activeSection, setActiveSection] = useState("dashboard");
    return (
        <div className="min-h-screen bg-linear-to-br from-[#eef2ff] to-[#f8fafc] px-6 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    {/* User Info */}
                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                            U
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            USER NAME
                        </h3>
                        <p className="text-sm text-gray-500">Student</p>
                    </div>
                    {/* Navigation */}
                    <nav className="space-y-6 text-sm">
                        <div>
                            <p  onClick={() => setActiveSection("dashboard")} className="font-semibold text-gray-700 mb-2 uppercase tracking-wide cursor-pointer">
                                Dashboard
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                Result
                            </p>
                            <ul className="space-y-2">
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Level 1 Result
                                </li>
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Level 2 Result
                                </li>
                            </ul>
                        </div>

                      
                        {/* doownload app button */}
                        <li
                            onClick={() => setActiveSection("download")}
                            className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
                        >
                            Download App
                        </li>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                Study Material
                            </p>
                            <ul className="space-y-2">
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Study Material
                                </li>
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Contact Information
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                Profile
                            </p>
                            <ul className="space-y-2">
                                <li onClick={() => setActiveSection("editProfile")} className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Edit Profile
                                </li>
                                <li className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
                                    Update Password
                                </li>
                                <li className="px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-500 cursor-pointer transition">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>
                {/* Main Content */}

                <main className="md:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                    {activeSection === "dashboard" && (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                                IMPORTANT DATES TO REMEMBER
                            </h2>
                            {/* Table */}
                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                                <table className="w-full text-sm text-gray-700">
                                    <thead>
                                        <tr className="bg-indigo-50 text-gray-800 text-left">
                                            <th className="p-4 font-semibold">Sr. No.</th>
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t hover:bg-gray-50 transition">
                                            <td className="p-4">1</td>
                                            <td className="p-4 font-medium">Level 1 Exam</td>
                                            <td className="p-4">
                                                GCC - November 8 for all GCC countries for all classes.
                                            </td>
                                        </tr>
                                        <tr className="border-t hover:bg-gray-50 transition">
                                            <td className="p-4">2</td>
                                            <td className="p-4 font-medium">Level 2 Exam</td>
                                            <td className="p-4">
                                                International students contact Science India forum.
                                            </td>
                                        </tr>
                                        <tr className="border-t hover:bg-gray-50 transition">
                                            <td className="p-4">3</td>
                                            <td className="p-4 font-medium">State Camp</td>
                                            <td className="p-4">
                                                Contact respective international forum for details.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-4 mt-8 text-sm">
                                <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                                    « Previous
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition">
                                    1
                                </button>
                                <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                                    Next »
                                </button>
                            </div>
                        </>
                    )}

                    {activeSection === "download" && <DownloadApp />}

                    {activeSection === "editProfile" && <p><EditProfile /></p>}
                    {/* {activeSection === "studymaterial" && <StudyMaterial />}  */}


                    {/* <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                        IMPORTANT DATES TO REMEMBER
                    </h2> */}
                    {/* Table */}
                    {/* <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm text-gray-700">
                            <thead>
                                <tr className="bg-indigo-50 text-gray-800 text-left">
                                    <th className="p-4 font-semibold">Sr. No.</th>
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t hover:bg-gray-50 transition">
                                    <td className="p-4">1</td>
                                    <td className="p-4 font-medium">Level 1 Exam</td>
                                    <td className="p-4">
                                        GCC - November 8 for all GCC countries for all classes.
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50 transition">
                                    <td className="p-4">2</td>
                                    <td className="p-4 font-medium">Level 2 Exam</td>
                                    <td className="p-4">
                                        International students contact Science India forum.
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50 transition">
                                    <td className="p-4">3</td>
                                    <td className="p-4 font-medium">State Camp</td>
                                    <td className="p-4">
                                        Contact respective international forum for details.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                    {/* Pagination */}
                    {/* <div className="flex justify-center items-center gap-4 mt-8 text-sm">
                        <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                            « Previous
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition">
                            1
                        </button>
                        <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                            Next »
                        </button>
                    </div> */}
                </main>
            </div>
        </div>
    );
}
=======
export default function DashboardHome() {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8">
      <h2 className="text-center text-[17px] font-semibold tracking-wide text-gray-800 mb-6">
        IMPORTANT DATES TO REMEMBER
      </h2>

      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[#d8dced] text-gray-800">
            <tr>
              <th className="p-3 text-left border-r">Sr. No.</th>
              <th className="p-3 text-left border-r">Name</th>
              <th className="p-3 text-left">Detail</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-t">
              <td className="p-3 border-r">1</td>
              <td className="p-3 border-r font-medium">Level 1 Exam</td>
              <td className="p-3">
                GCC - November 8 for all GCC countries for all classes.
              </td>
            </tr>
            <tr className="border-t bg-[#f7f8fc]">
              <td className="p-3 border-r">2</td>
              <td className="p-3 border-r font-medium">Level 2 Exam</td>
              <td className="p-3">
                For International students contact Science India/International forum.
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3 border-r">3</td>
              <td className="p-3 border-r font-medium">State Camp</td>
              <td className="p-3">
                Contact respective international forum for more details.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
>>>>>>> origin/wb-siddharth
