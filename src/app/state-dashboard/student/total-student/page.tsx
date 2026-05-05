
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";

type Student = {
  id: number;
  name: string;
  nationalId?: string;
  school?: string;
  class?: string;
  dob?: string;
  gender?: string;
  parentName?: string;
  parentMobile?: string;
  student_email?: string;
  username?: string;
  password?: string;
};

export default function TotalStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [region, setRegion] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateRange, setDateRange] = useState("");

  // 🔥 debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 FIXED API CALL
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/admin/students", {
        page: 1,
        per_page: 10,
        status: 1,

        // optional filters
        region,
        class: classFilter,
        search: debouncedSearch,
        date_range: dateRange,
      });

      console.log("API:", res.data);

      const raw = res.data?.data?.data || [];

      const formatted = raw.map((s: any) => ({
        id: s.id,
        name: s.name,
        nationalId: s.national_id,
        school: s.school_name,
        class: s.class?.name,
        dob: s.date_of_birth,
        gender:
          s.gender === 1 ? "Male" : s.gender === 2 ? "Female" : "-",
        parentName: s.parent_name,
        parentMobile: s.parent_phone_number,
        student_email: s.student_email,
        username: s.user?.username,
        password: s.user?.temp_password,
      }));

      setStudents(formatted);

      // 🔥 total count
      setTotal(res?.data?.data?.total || 0);

    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [region, classFilter, debouncedSearch, dateRange]);

  // 🔥 export CSV
  const handleExport = () => {
    if (!students.length) return;

    const headers = Object.keys(students[0]);
    const rows = students.map((s) =>
      headers.map((h) => (s as any)[h])
    );

    const csv = [headers, ...rows]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#eef3f9] p-6 space-y-6">

      {/* FILTER */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-[#17395c]">
          Student Filters
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <select
            onChange={(e) => setRegion(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#17395c]"
          >
            <option value="">Region</option>
            <option value="AE">UAE</option>
          </select>

          <select
            onChange={(e) => setClassFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#17395c]"
          >
            <option value="">Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
          </select>

          <input
            type="text"
            placeholder="Date Range"
            onChange={(e) => setDateRange(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#17395c]"
          />

          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#17395c]"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleExport}
            className="bg-[#17395c] text-white px-5 py-2 rounded-lg hover:bg-[#122b45]"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="px-6 py-4 border-b flex justify-between">
          <h2 className="font-semibold text-[#17395c]">Students</h2>
          <span className="text-sm text-gray-500">
            Total: {total || students.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="w-40 px-4 py-3">#</th>
                <th className="w-40 px-3 py-2">Name</th>
                <th className="w-40 px-3 py-2">Email</th>
                <th className="w-40 px-3 py-2">National ID</th>
                <th className="w-40 px-3 py-2">School</th>
                <th className="w-40 px-3 py-2">Class</th>
                <th className="w-50 px-3 py-2">DOB</th>
                <th className="w-40 px-3 py-2">Gender</th>
                <th className=" w-40 px-3 py-2">Parent</th>
                <th className="W-40 px-3 py-2">Mobile</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-6">
                    No data found
                  </td>
                </tr>
              ) : (
                students.map((s, i) => (
                  <tr key={s.id} className="  border-b hover:bg-gray-50">
                    <td className="px-4 py-3 w-40">{i + 1}</td>
                    <td className="font-medium text-[#17395c]">{s.name}</td>
                    <td className="w-40 px-3 py-2">{s.student_email || "-"}</td>
                    <td className="px-3 py-2">{s.nationalId || "-"}</td>
                    <td className="px-3 py-2">{s.school || "-"}</td>
                    <td className="px-3 py-2">{s.class || "-"}</td>
                    <td className="px-3 py-2">{s.dob || "-"}</td>
                    <td className="px-3 py-2">{s.gender || "-"}</td>
                    <td className="px-3 py-2">{s.parentName || "-"}</td>
                    <td className="px-3 py-2">{s.parentMobile || "-"}</td>
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