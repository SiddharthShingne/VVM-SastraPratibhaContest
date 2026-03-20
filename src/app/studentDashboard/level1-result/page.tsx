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
    <div className="bg-white rounded-lg p-8">

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading result...</p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* DATA */}
      {!loading && !error && data && (
        <div className="space-y-4 text-sm text-gray-700">

          <div className="flex justify-between">
            <span>User ID:</span>
            <span className="font-medium">{data.user_id}</span>
          </div>

          <div className="flex justify-between">
            <span>Student ID:</span>
            <span className="font-medium">{data.student_id}</span>
          </div>

          <div className="flex justify-between">
            <span>Payment Status:</span>
            <span className="font-medium capitalize">
              {data.payment_status.replace("_", " ")}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Level 3 Qualified:</span>
            <span className="font-medium">
              {data.level3_qualified ? "Yes" : "No"}
            </span>
          </div>

          {/* RESULT STATUS */}
          <div className="mt-6 text-center">
            {data.is_qualified ? (
              <div className="text-green-600 font-semibold text-lg">
                ✅ Qualified for Next Level
              </div>
            ) : (
              <div className="text-red-500 font-semibold text-lg">
                ❌ Not Qualified
              </div>
            )}
          </div>

          {/* PAYMENT LINK (if exists) */}
          {data.payment_link && (
            <div className="text-center mt-4">
              <a
                href={data.payment_link}
                target="_blank"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Complete Payment
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}