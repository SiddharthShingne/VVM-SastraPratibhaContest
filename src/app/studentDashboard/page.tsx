"use client";

import { useEffect, useState } from "react";
import { getImportantDates } from "@/services/importantDatesService";
import { getInstractionDocument } from "@/services/importantDatesService";
interface DateItem {
  id: number;
  name: string;
  detail: string;
}

export default function DashboardHome() {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [instruction, setInstruction] = useState<string>("");
  const [instructionLoading, setInstructionLoading] = useState(true);

  useEffect(() => {
    const loadDates = async () => {
      try {
        const res = await getImportantDates(1);

        const apiDates = res?.data?.data || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedDates = apiDates.map((item: any, index: number) => ({
          id: index + 1,
          name: item.title,
          detail: item.description,
        }));

        setDates(formattedDates);
        // if API returns { data: [...] }
      } catch (error) {
        console.error("Error fetching important dates:", error);
        setDates([]);
      } finally {
        setLoading(false);
      }
    };

    loadDates();
  }, []);

  useEffect(() => {
    const loadInstruction = async () => {
      try {
        const res = await getInstractionDocument("level_1_exam");

        setInstruction(res?.data?.content || "");
      } catch (error) {
        console.error("Error fetching instruction document:", error);
        setInstruction("");
      } finally {
        setInstructionLoading(false);
      }
    };

    loadInstruction();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-300 rounded-md shadow-sm p-5 text-center text-gray-500">
        Loading important dates...
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm p-5">
      <h2 className="text-center text-[14px] font-semibold tracking-wide text-gray-800 mb-4">
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

      {/* Exam Instructions */}
      {/* <div className="bg-white border border-gray-300 rounded-md shadow-sm p-5 mt-6">
        <h2 className="text-center text-[14px] font-semibold tracking-wide text-gray-800 mb-4">
          EXAM INSTRUCTIONS
        </h2>

        {instructionLoading ? (
          <div className="text-center text-gray-500">
            Loading instructions...
          </div>
        ) : (
          <div className="text-[13px] text-gray-700 whitespace-pre-line leading-relaxed max-h-112.5 overflow-y-auto">
            {instruction || "No instructions available."}
          </div>
        )}
      </div> */}
    </div>
  );
}             
