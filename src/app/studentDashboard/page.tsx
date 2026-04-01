"use client";

import { useEffect, useState } from "react";
import { getImportantDates } from "@/services/importantDatesService";

interface DateItem {
  id: number;
  name: string;
  detail: string;
}

export default function DashboardHome() {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDates = async () => {
      try {
        const res = await getImportantDates(1);

        // if API returns { data: [...] }
        setDates(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching important dates:", error);
        setDates([]);
      } finally {
        setLoading(false);
      }
    };

    loadDates();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-300 rounded-md shadow-sm p-5 text-center text-gray-500">
        Loading important dates...
      </div>
    );
  }

  return (<>
    {/* <div className="bg-white border border-gray-300 rounded-md shadow-sm p-5 mb-10px"> */}
             <img
        src="/gcc/vvm-bg-image.png"
        alt="Background"
        fullWidth
        className="object-cover"
        priority
      />
      <h2 className="text-center text-[14px] font-semibold tracking-wide text-gray-800 mt-10 mb-4">
        IMPORTANT DATES TO REMEMBER
      </h2>

      <div className="border border-gray-300 rounded-md overflow-hidden mt-3">
        <table className="w-full text-[11px]">
          <thead className="bg-[#d8dced] text-gray-800">
            <tr>
              <th className="p-2 text-left border-r">Sr. No.</th>
              <th className="p-2 text-left border-r">Name</th>
              <th className="p-2 text-left">Detail</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dates.map((item, index) => (
              <tr
                key={item.id}
                className={`border-t ${index % 2 === 1 ? "bg-[#f7f8fc]" : ""}`}
              >
                <td className="p-2 border-r">{index + 1}</td>
                <td className="p-2 border-r font-medium">{item.name}</td>
                <td className="p-2">{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {dates.length === 0 && (
          <div className="text-center p-4 text-gray-500">
            No important dates available.
          </div>
        )}
      </div>
    {/* </div> */}
    </>
  );
}