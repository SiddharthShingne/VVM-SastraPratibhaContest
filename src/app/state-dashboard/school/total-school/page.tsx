
"use client";

import { useEffect, useState } from "react";

type School = {
  id: number;
  schoolName: string;
  regionCode: string;
  schoolCode: string;
  totalStudents: number;
};

export default function SchoolsPage() {
  const [data, setData] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");

  // ===== FETCH DATA =====
  const fetchSchools = async () => {
    setLoading(true);
    try {
      // Replace with your API
      // const res = await fetch(`/api/schools?country=${country}`);
      // const json = await res.json();
      // setData(json.data);

      // dummy
      setData([
        {
          id: 1,
          schoolName: "Abu Dhabi Indian School Muroor",
          regionCode: "ARE-AD",
          schoolCode: "AEAD-0001",
          totalStudents: 18,
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [country]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Schools Overview
        </h1>

        <select
          onChange={(e) => setCountry(e.target.value)}
          className="border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Country</option>
          <option value="uae">UAE</option>
          <option value="india">India</option>
        </select>
      </div>

      {/* ===== CARD TABLE ===== */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-5 px-6 py-4 text-sm font-semibold text-gray-500 border-b bg-gray-50">
          <span>SR NO.</span>
          <span>SCHOOL NAME</span>
          <span>REGION CODE</span>
          <span>SCHOOL CODE</span>
          <span className="text-right">TOTAL STUDENTS</span>
        </div>

        {/* TABLE BODY */}
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No data found
          </div>
        ) : (
          data.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-5 px-6 py-4 text-sm items-center border-b hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-700">
                {index + 1}
              </span>

              <span className="text-blue-600 font-medium">
                {item.schoolName}
              </span>

              <span className="text-gray-600">
                {item.regionCode}
              </span>

              <span className="text-gray-600">
                {item.schoolCode}
              </span>

              <span className="text-right font-semibold text-gray-800">
                {item.totalStudents}
              </span>
            </div>
          ))
        )}

        {/* ===== FOOTER / PAGINATION ===== */}
        <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500 bg-gray-50">

          <div>
            Items per page:
            <select className="ml-2 border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span>1 – 10 of 96</span>
            <button className="px-2 py-1 rounded hover:bg-gray-200">◀</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}