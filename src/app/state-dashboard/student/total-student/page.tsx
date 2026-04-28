
"use client";

import { useEffect, useState } from "react";

// ================= CONFIG =================
const BASE_URL =
  "http://VVM-2025-UAT-ALB-1387255077.ap-south-1.elb.amazonaws.com/backend/public/index.php/api";

// ================= TYPES =================
type Student = {
  id: number;
  name: string;
  username: string;
  password: string;
  nationalId: string;
  school: string;
  class: string;
  dob: string;
  gender: string;
  examLanguage: string;
  address: string;
  pincode: string;
  parentName: string;
  parentMobile: string;
};

// ================= COMPONENT =================
export default function TotalStudentsPage() {
  // -------- STATE --------
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [region, setRegion] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateRange, setDateRange] = useState("");

  const [file, setFile] = useState<File | null>(null);

  // -------- DEBOUNCE SEARCH --------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // -------- FETCH STUDENTS --------
  const fetchStudents = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/students?region=${region}&class=${classFilter}&search=${debouncedSearch}&date=${dateRange}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      const data = await res.json();

      // Adjust mapping if API structure differs
      setStudents(data?.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [region, classFilter, debouncedSearch, dateRange]);

  // -------- EXPORT CSV --------
  const handleExport = () => {
    if (!students.length) return;

    const headers = Object.keys(students[0]);
    const rows = students.map((s) => headers.map((h) => (s as any)[h]));

    const csv =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };

  // -------- SAMPLE DOWNLOAD --------
  const downloadSample = () => {
    const csv =
      "Name,Username,Password,Class,DOB,Gender\nSample,user123,pass123,6,01-01-2012,Male";

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_students.csv";
    a.click();
  };

  // -------- UPLOAD --------
  const handleUpload = async () => {
    if (!file) return alert("Please select file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/students/bulk-upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData,
      });

      const data = await res.json();

      alert(data.message || "Upload successful");
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // ================= UI =================
  return (
    <div className=" min-h-screen p-6 space-y-8">

      {/* ===== FILTERS ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <select
            className="border p-3 rounded-lg"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Select Region</option>
          </select>

          <select
            className="border p-3 rounded-lg"
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="">Select Class</option>
          </select>

          <input
            type="text"
            placeholder="Start date - End date"
            className="border p-3 rounded-lg"
            onChange={(e) => setDateRange(e.target.value)}
          />

          <input
            type="text"
            placeholder="🔍 Search Records"
            className="border p-3 rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
    
        <div className="flex justify-end mt-4">
          <button
            onClick={handleExport}
            className="bg-#17395c text-blue px-6 py-2 rounded-lg hover:bg-#17395c/80 transition"
          >
            Export
          </button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border overflow-x-auto">
        {loading ? (
          <p className="text-center py-6">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            No records found
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th>SR NO.</th>
                <th>NAME</th>
                <th>USERNAME</th>
                <th>PASSWORD</th>
                <th>NATIONAL ID</th>
                <th>SCHOOL</th>
                <th>CLASS</th>
                <th>DOB</th>
                <th>GENDER</th>
                <th>EXAM LANGUAGE</th>
                <th>ADDRESS</th>
                <th>PINCODE</th>
                <th>PARENT NAME</th>
                <th>PARENT MOBILE</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} className="border-b">
                  <td>{i + 1}</td>
                  <td className="text-blue-600">{s.name}</td>
                  <td>{s.username}</td>
                  <td>{s.password}</td>
                  <td>{s.nationalId}</td>
                  <td>{s.school}</td>
                  <td>{s.class}</td>
                  <td>{s.dob}</td>
                  <td>{s.gender}</td>
                  <td>{s.examLanguage}</td>
                  <td>{s.address}</td>
                  <td>{s.pincode}</td>
                  <td>{s.parentName}</td>
                  <td>{s.parentMobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    
    
    </div>
  );
}