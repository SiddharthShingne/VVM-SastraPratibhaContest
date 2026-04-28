
"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "@/services/axiosInstance";

interface Student {
  id: number;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
  studentMobile: string;
  studentEmail: string;
  lastLogin: string;
  mockExam: boolean;
  finalExam: boolean;
  createdAt: string;
  paymentStatus: string;
}

export default function ViewStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get("/students");
        setStudents(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[#eef3f9] p-6">

      {/* CARD */}
      <div className="bg-white rounded-3xl shadow-xl p-6 relative overflow-hidden">

        {/* TOP GRADIENT */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-[#17395c] mb-6">
          View Individual Students
        </h2>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">

            {/* HEADER */}
            <thead>
              <tr className="text-[#7a8fa6] uppercase text-xs border-b">
                <th className="py-3 px-2">Sr. No.</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Username</th>
                <th className="py-3 px-2">Password</th>
                <th className="py-3 px-2">National Id</th>
                <th className="py-3 px-2">School Name</th>
                <th className="py-3 px-2">Class</th>
                <th className="py-3 px-2">DOB</th>
                <th className="py-3 px-2">Gender</th>
                <th className="py-3 px-2">Exam Language</th>
                <th className="py-3 px-2">Address</th>
                <th className="py-3 px-2">Pincode</th>
                <th className="py-3 px-2">Parent Name</th>
                <th className="py-3 px-2">Parent Mobile No.</th>
                <th className="py-3 px-2">Parent Email</th>
                <th className="py-3 px-2">Student Mobile No.</th>
                <th className="py-3 px-2">Student Email</th>
                <th className="py-3 px-2">Last Login At</th>
                <th className="py-3 px-2">Mock Exam</th>
                <th className="py-3 px-2">Final Exam</th>
                <th className="py-3 px-2">Created At</th>
                <th className="py-3 px-2">Payment Status</th>
                <th className="py-3 px-2">Action</th>

              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-6">
                    No data found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-[#f8fbff] transition"
                  >
                    <td className="py-3 px-2 font-medium">{s.parentName}</td>
                    <td className="py-3 px-2">{s.parentMobile}</td>
                    <td className="py-3 px-2">{s.parentEmail}</td>
                    <td className="py-3 px-2">{s.studentMobile}</td>
                    <td className="py-3 px-2">{s.studentEmail}</td>
                    <td className="py-3 px-2">{s.lastLogin || "-"}</td>

                    {/* MOCK */}
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${s.mockExam
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                          }`}
                      >
                        {s.mockExam ? "Yes" : "No"}
                      </span>
                    </td>

                    {/* FINAL */}
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${s.finalExam
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                          }`}
                      >
                        {s.finalExam ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="py-3 px-2">{s.createdAt}</td>

                    {/* PAYMENT */}
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                        {s.paymentStatus}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="py-3 px-2 flex gap-3">
                      <FaEdit className="cursor-pointer text-[#17395c] hover:scale-110" />
                      <FaTrash className="cursor-pointer text-red-500 hover:scale-110" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}