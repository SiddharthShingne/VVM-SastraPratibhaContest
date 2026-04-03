/* eslint-disable @typescript-eslint/no-unused-vars */
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
    // <div className="vvm-section-card">
    //   <div className="vvm-section-inner">

    //     {/* 🔥 HEADER (UPGRADED) */}
    //     <div className="text-center mb-6 relative">

    //       <p className="text-[11px] tracking-[1.5px] font-bold text-[#8fa2b8] uppercase">
    //         Dashboard
    //       </p>

    //       <h2 className="vvm-section-title">
    //         Important Dates
    //         </h2>

    //       {/* Accent line (better than before) */}
    //       <div className="flex justify-center mt-2">
    //         <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />
    //       </div>

    //     </div>

    //     {/* 🔥 TABLE */}
    //     <div className="vvm-table-wrap">
    //       <table className="vvm-table">

    //         <thead>
    //           <tr>
    //             <th>Sr. No.</th>
    //             <th>Name</th>
    //             <th>Detail</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {dates.map((item, index) => (
    //             <tr key={item.id}>

    //               <td>{index + 1}</td>

    //               <td className="font-semibold text-[#17395c]">
    //                 {item.name}
    //               </td>

    //               <td>
    //                 {item.detail}
    //               </td>

    //             </tr>
    //           ))}
    //         </tbody>

    //       </table>

    //       {/* EMPTY STATE */}
    //       {dates.length === 0 && (
    //         <div className="text-center py-6 text-[#7a90a8] text-sm">
    //           No important dates available.
    //         </div>
    //       )}
    //     </div>

    //   </div>
    // </div>
  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_22px_50px_rgba(23,57,92,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden transition-all duration-300 hover:shadow-[0_28px_60px_rgba(23,57,92,0.1),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5">
  
  {/* Top gradient bar */}
  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c] z-10" />
  
  <div className="p-8">
    
    {/* HEADER with enhanced styling */}
    <div className="text-center mb-8 relative">
      

      <h2 className="text-2xl md:text-3xl font-black bg-linear-to-r from-[#17395c] via-[#1f4e7a] to-[#b88d00] bg-clip-text text-transparent mb-3">
        Important Dates
      </h2>

      <div className="flex justify-center mt-2">
        <div className="w-20 h-0.75 rounded-full bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />
      </div>
      
      <p className="text-[12px] text-[#9aa9bc] mt-3">
        Stay updated with key academic events
      </p>
    </div>

    {/* TABLE CARD - Light & Modern */}
    <div className="rounded-2xl bg-white border border-[#eef2f8] shadow-[0_4px_20px_rgba(23,57,92,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(23,57,92,0.08)]">
      
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          {/* HEADER - Light & Clean */}
          <thead>
            {dates.length > 0 && (
              <tr className="bg-linear-to-r from-[#f8fafc] to-[#fefdf5] border-b-2 border-[#f4df17]/30">
                <th className="px-6 py-4 text-left text-xs font-extrabold text-[#17395c] uppercase tracking-wider">
                  Sr. No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-[#17395c] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-[#17395c] uppercase tracking-wider">
                  Detail
                </th>
              </tr>
            )}
          </thead>

          {/* BODY - Clean & Airy */}
          <tbody className="divide-y divide-[#f0f3f8]">
            {dates.map((item, index) => (
              <tr
                key={item.id}
                className="group hover:bg-linear-to-r hover:from-[#fefdf5] hover:to-[#f8fafc] transition-all duration-200 cursor-pointer"
              >
                <td className="px-6 py-4 text-[#7a8fa6] font-medium">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f8fafc] group-hover:bg-[#f4df17]/10 text-xs font-bold text-[#17395c] transition-colors duration-200">
                    {index + 1}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="font-bold text-[#17395c] group-hover:text-[#1f4e7a] transition-colors duration-200">
                    {item.name}
                  </span>
                </td>

                <td className="px-6 py-4 text-[#5a6f8a] leading-relaxed">
                  {item.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE - Enhanced */}
      {dates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          
          {/* Animated icon circle */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#f4df17]/20 to-[#17395c]/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-[#f8fafc] to-[#fefdf5] flex items-center justify-center shadow-lg border border-[#e6ecf3]">
              <span className="text-3xl">📅</span>
            </div>
          </div>

          <h3 className="text-[#17395c] font-bold text-lg mb-2">
            No important dates available
          </h3>

          <p className="text-[#9aa9bc] text-sm max-w-xs">
            New updates and important deadlines will appear here as they become available.
          </p>
          
          {/* Decorative dots */}
          <div className="flex gap-2 mt-6">
            <div className="w-1 h-1 rounded-full bg-[#f4df17]/40" />
            <div className="w-1 h-1 rounded-full bg-[#17395c]/30" />
            <div className="w-1 h-1 rounded-full bg-[#f4df17]/40" />
          </div>
        </div>
      )}
      
      {/* Footer with record count */}
      {dates.length > 0 && (
        <div className="px-6 py-3 bg-[#fefdf5] border-t border-[#eef2f8]">
          <p className="text-[11px] text-[#9aa9bc] font-medium">
            Showing {dates.length} record{dates.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      
    </div>

  </div>
</div>
  );
}             
