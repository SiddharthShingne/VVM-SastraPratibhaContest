
"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "@/services/axiosInstance";

interface Student {
  id: number;
  name: string;
  username?: string;
  password?: string;
  national_id?: string;

  date_of_birth: string;
  gender: number;
  school_name: string;
  class_id: number;
  address: string;
  pincode: string;

  parent_name: string;
  parent_phone_number: string;
  parent_email: string;
  student_mobile_number: string;
  student_email: string;

  created_at: string;
  payment_status: number;
  is_mock: number;
  is_final: number;
}

export default function ViewStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination states
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.post("/admin/students", {
          page: page,
          per_page: perPage,
        });

        const response = res.data?.data;

        setStudents(response?.data || []);
        setTotalPages(response?.last_page || 1);

      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, perPage]);

  return (
    <div className="min-h-screen bg-[#eef3f9] p-6">
      <div className="bg-white rounded-3xl shadow-xl p-6 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

        <h2 className="text-2xl font-bold text-[#17395c] mb-6">
          View Individual Students
        </h2>

        {/* ✅ PAGE SIZE SELECTOR (TOP) */}
        <div className="flex justify-end mb-4">
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border px-3 py-1 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">

            <thead>
              <tr className="text-[#7a8fa6] uppercase text-xs border-b">
                <th className="py-3 px-2">Sr. No.</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Username</th>
                <th className="py-3 px-2">Password</th>
                <th className="py-3 px-2">National ID</th>
                <th className="py-3 px-2">School</th>
                <th className="py-3 px-2">Class</th>
                <th className="py-3 px-2">DOB</th>
                <th className="py-3 px-2">Gender</th>
                <th className="py-3 px-2">Address</th>
                <th className="py-3 px-2">Pincode</th>
                <th className="py-3 px-2">Parent Name</th>
                <th className="py-3 px-2">Parent Mobile</th>
                <th className="py-3 px-2">Parent Email</th>
                <th className="py-3 px-2">Student Mobile</th>
                <th className="py-3 px-2">Student Email</th>
                <th className="py-3 px-2">Mock Exam</th>
                <th className="py-3 px-2">Final Exam</th>
                <th className="py-3 px-2">Created At</th>
                <th className="py-3 px-2">Payment</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={21} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={21} className="text-center py-6">
                    No data found
                  </td>
                </tr>
              ) : (
                students.map((s, index) => (
                  <tr key={s.id} className="border-b hover:bg-[#f8fbff]">

                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-2 font-medium">{s.name || "-"}</td>
                    <td className="py-3 px-2">{s.username || "-"}</td>
                    <td className="py-3 px-2">{s.password || "-"}</td>
                    <td className="py-3 px-2">{s.national_id || "-"}</td>
                    <td className="py-3 px-2">{s.school_name || "-"}</td>
                    <td className="py-3 px-2">{s.class_id || "-"}</td>
                    <td className="py-3 px-2">{s.date_of_birth || "-"}</td>
                    <td className="py-3 px-2">
                      {s.gender === 1 ? "Male" : s.gender === 2 ? "Female" : "-"}
                    </td>
                    <td className="py-3 px-2">{s.address || "-"}</td>
                    <td className="py-3 px-2">{s.pincode || "-"}</td>
                    <td className="py-3 px-2 font-medium">{s.parent_name || "-"}</td>
                    <td className="py-3 px-2">{s.parent_phone_number || "-"}</td>
                    <td className="py-3 px-2">{s.parent_email || "-"}</td>
                    <td className="py-3 px-2">{s.student_mobile_number || "-"}</td>
                    <td className="py-3 px-2">{s.student_email || "-"}</td>

                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        s.is_mock ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                      }`}>
                        {s.is_mock ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        s.is_final ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                      }`}>
                        {s.is_final ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="py-3 px-2">
                      {s.created_at?.slice(0, 10) || "-"}
                    </td>

                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        s.payment_status === 1
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}>
                        {s.payment_status === 1 ? "Paid" : "Pending"}
                      </span>
                    </td>

                    <td className="py-20 px-2 flex gap-3 align-middle">
                      <FaEdit className="cursor-pointer text-[#17395c]" />
                      <FaTrash className="cursor-pointer text-red-500" />
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* ✅ PAGINATION (BOTTOM) */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}