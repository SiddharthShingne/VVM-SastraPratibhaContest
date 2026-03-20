/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getGccQualifiedStudents } from "@/services/importantDatesService";

export default function Level1Result() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getGccQualifiedStudents();
        setData(res);
      } catch (err: any) {
        setError(err.message || "Failed to fetch result");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-8 max-w-2xl mx-auto">

      {/* HEADER */}
      <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-700 mb-6 tracking-wide">
        Level 1 Result
      </h2>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          Loading result...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-center bg-red-50 text-red-500 px-4 py-2 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* DATA */}
      {!loading && !error && data && (
        <div className="space-y-6">

          {/* RESULT STATUS */}
          <div
            className={`rounded-2xl p-5 text-center font-semibold text-base sm:text-lg shadow-sm transition-all ${data.is_qualified
                ? "bg-linear-to-r from-green-100 to-green-50 text-green-700 border border-green-200"
                : "bg-linear-to-r from-red-100 to-red-50 text-red-600 border border-red-200"
              }`}
          >
            
            {data.is_qualified
              ? "Qualified for Next Level"
              : "Not Qualified"}
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* CARD */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
              <p className="text-gray-400 text-xs mb-1">User ID</p>
              <p className="font-semibold text-gray-800 text-sm">
                {data.user_id || "-"}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
              <p className="text-gray-400 text-xs mb-1">Student ID</p>
              <p className="font-semibold text-gray-800 text-sm">
                {data.student_id || "-"}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
              <p className="text-gray-400 text-xs mb-1">Payment Status</p>
              <p className="font-semibold text-gray-800 text-sm capitalize">
                {data.payment_status
                  ? data.payment_status.replace("_", " ")
                  : "N/A"}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
              <p className="text-gray-400 text-xs mb-1">Level 3 Qualified</p>
              <p
                className={`font-semibold text-sm ${data.level3_qualified
                    ? "text-green-600"
                    : "text-red-500"
                  }`}
              >
                {data.level3_qualified ? "Yes" : "No"}
              </p>
            </div>

          </div>

          {/* PAYMENT BUTTON */}
          {data.payment_link && (
            <div className="text-center pt-2">
              <a
                href={data.payment_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-xl text-white text-sm font-medium bg-linear-to-r from-indigo-600 to-purple-600 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Complete Payment →
              </a>
            </div>
          )}

        </div>
      )}
    </div>
  );
}