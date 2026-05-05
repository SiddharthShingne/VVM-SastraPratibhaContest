
"use client";

import { useEffect, useState } from "react";
import { getSchools } from "@/services/uaeService";

type School = {
  id: number;
  school_name: string;
  region_code: string;
  school_code: string;
  students_count: number;
  paid_students_count: number;
  unpaid_students_count: number;
};

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ FETCH API
  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        const res = await getSchools(page, perPage);

        console.log("API RESPONSE:", res);

        const data = res?.data;

        setSchools(data?.data || []);
        setTotalPages(data?.last_page || 1);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [page, perPage]);

  return (
    <div className="min-h-screen bg-[#eef3f9] p-6">

      <div className="bg-white rounded-3xl shadow-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#17395c]">
            Schools List
          </h2>

          {/* PER PAGE SELECT */}
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border px-3 py-2 rounded-lg"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-3 py-3">#</th>
                <th>School Name</th>
                <th>Region</th>
                <th>Code</th>
                <th>Total Students</th>
                <th>Paid</th>
                <th>Unpaid</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : schools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    No data found
                  </td>
                </tr>
              ) : (
                schools.map((s, index) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">

                    <td className="px-3 py-3">
                      {(page - 1) * perPage + index + 1}
                    </td>

                    <td className="font-medium text-[#17395c]">
                      {s.school_name}
                    </td>

                    <td>{s.region_code}</td>

                    <td>{s.school_code}</td>

                    <td>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                        {s.students_count}
                      </span>
                    </td>

                    <td>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
                        {s.paid_students_count}
                      </span>
                    </td>

                    <td>
                      <span className="px-2 py-1 bg-red-100 text-red-500 rounded">
                        {s.unpaid_students_count}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}