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
  // return (
  //   <div className="relative bg-gradient-to-br from-white via-[#fffef7] to-white/95 backdrop-blur-sm rounded-3xl border border-[#f4df17]/30 shadow-[0_22px_50px_rgba(244,223,23,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden transition-all duration-500 hover:shadow-[0_28px_60px_rgba(244,223,23,0.15),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-1">

  //     {/* Animated Top gradient bar - more vibrant */}
  //     <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#f4df17] via-[#ffea4f] to-[#f4df17] z-10 animate-pulse" />

  //     {/* Decorative background circles */}
  //     <div className="absolute top-20 -right-20 w-64 h-64 bg-[#f4df17]/5 rounded-full blur-3xl" />
  //     <div className="absolute bottom-20 -left-20 w-64 h-64 bg-[#17395c]/5 rounded-full blur-3xl" />

  //     <div className="p-6 md:p-8 relative z-2">

  //       {/* HEADER - More vibrant & dynamic */}
  //       <div className="text-center mb-8 md:mb-10 relative">
  //         {/* Decorative dots */}
  //         {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
  //           <div className="w-2 h-2 rounded-full bg-[#f4df17]/40" />
  //           <div className="w-2 h-2 rounded-full bg-[#17395c]/30 mt-2" />
  //           <div className="w-2 h-2 rounded-full bg-[#f4df17]/40 mt-2" />
  //         </div>
  //         <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
  //           <div className="w-2 h-2 rounded-full bg-[#17395c]/30" />
  //           <div className="w-2 h-2 rounded-full bg-[#f4df17]/40 mt-2" />
  //           <div className="w-2 h-2 rounded-full bg-[#17395c]/30 mt-2" />
  //         </div> */}

  //         <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#17395c] via-[#1f4e7a] to-[#d4a800] bg-clip-text text-transparent mb-4 tracking-tight">
  //           Important Dates
  //         </h2>

  //         <div className="flex justify-center mt-3">
  //           <div className="w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-[#f4df17] to-transparent" />
  //         </div>

  //         <p className="text-sm md:text-base text-[#5a6f8a] mt-4 font-medium max-w-md mx-auto">
  //           🗓️ Stay updated with key academic events
  //         </p>
  //       </div>

  //       {/* TABLE CARD - Vibrant & Modern with glass morphism */}
  //       <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#f4df17]/20 shadow-[0_8px_32px_rgba(244,223,23,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(244,223,23,0.15)] hover:border-[#f4df17]/40">

  //         {/* TABLE */}
  //         <div className="overflow-x-auto">
  //           <table className="w-full text-sm md:text-base">

  //             {/* HEADER - Vibrant gradient */}
  //             <thead>
  //               {dates.length > 0 && (
  //                 <tr className="bg-gradient-to-r from-[#17395c] via-[#1f4e7a] to-[#17395c] border-b-4 border-[#f4df17]">
  //                   <th className="px-4 md:px-6 py-4 md:py-5 text-left text-xs md:text-sm font-black text-white uppercase tracking-wider">
  //                     <span className="flex items-center gap-2">
  //                       Sr. No.
  //                     </span>
  //                   </th>
  //                   <th className="px-4 md:px-6 py-4 md:py-5 text-left text-xs md:text-sm font-black text-white uppercase tracking-wider">
  //                     <span className="flex items-center gap-2">
  //                       Name
  //                     </span>
  //                   </th>
  //                   <th className="px-4 md:px-6 py-4 md:py-5 text-left text-xs md:text-sm font-black text-white uppercase tracking-wider">
  //                     <span className="flex items-center gap-2">
  //                     Detail
  //                     </span>
  //                   </th>
  //                 </tr>
  //               )}
  //             </thead>

  //             {/* BODY - Vibrant rows with alternating colors */}
  //             <tbody className="divide-y divide-[#f4df17]/20">
  //               {dates.map((item, index) => (
  //                 <tr
  //                   key={item.id}
  //                   className={`
  //                 group transition-all duration-300 cursor-pointer
  //                 ${index % 2 === 0 ? 'bg-white hover:bg-gradient-to-r hover:from-[#fffef7] hover:to-[#fff8e0]' : 'bg-[#fffef7] hover:bg-gradient-to-r hover:from-[#fffef7] hover:to-[#fff8e0]'}
  //               `}
  //                 >
  //                   <td className="px-4 md:px-6 py-4 md:py-5">
  //                     <div className="flex items-center gap-3">
  //                       <span className="hidden sm:inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#f4df17] to-[#e0c800] text-[#17395c] text-xs md:text-sm font-black shadow-md group-hover:scale-110 transition-transform duration-200">
  //                         {index + 1}
  //                       </span>
  //                       <span className="sm:hidden inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#f4df17] to-[#e0c800] text-[#17395c] text-xs font-black shadow-md">
  //                         {index + 1}
  //                       </span>
  //                     </div>
  //                   </td>

  //                   <td className="px-4 md:px-6 py-4 md:py-5">
  //                     <span className="font-bold text-[#17395c] group-hover:text-[#d4a800] transition-all duration-200 text-sm md:text-base">
  //                       {item.name}
  //                     </span>
  //                   </td>

  //                   <td className="px-4 md:px-6 py-4 md:py-5">
  //                     <div className="flex items-start gap-2">
  //                       <span className="text-[#4a6075] leading-relaxed text-sm md:text-base">
  //                         {item.detail}
  //                       </span>
  //                     </div>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>

  //         {/* EMPTY STATE - Vibrant & engaging */}
  //         {dates.length === 0 && (
  //           <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center bg-gradient-to-br from-white to-[#fffef7]">

  //             {/* Animated icon with pulse effect */}
  //             <div className="relative mb-6">
  //               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f4df17]/40 to-[#17395c]/20 animate-ping" />
  //               <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#f4df17] to-[#e0c800] flex items-center justify-center shadow-xl animate-bounce">
  //                 <span className="text-4xl md:text-5xl">📅</span>
  //               </div>
  //             </div>

  //             <h3 className="text-[#17395c] font-black text-xl md:text-2xl mb-3">
  //               ✨ Coming Soon! ✨
  //             </h3>

  //             <p className="text-[#6b8099] text-sm md:text-base max-w-sm mx-auto font-medium">
  //               Important dates and deadlines will appear here as they become available.
  //             </p>

  //             {/* Decorative dots with animation */}
  //             <div className="flex gap-3 mt-8">
  //               <div className="w-2 h-2 rounded-full bg-[#f4df17] animate-pulse" />
  //               <div className="w-2 h-2 rounded-full bg-[#17395c] animate-pulse delay-150" />
  //               <div className="w-2 h-2 rounded-full bg-[#f4df17] animate-pulse delay-300" />
  //             </div>
  //           </div>
  //         )}

  //         {/* Footer with record count - vibrant stats bar */}
  //         {dates.length > 0 && (
  //           <div className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-[#17395c]/5 via-[#f4df17]/10 to-[#17395c]/5 border-t-2 border-[#f4df17]/20">
  //             <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
  //               <p className="text-[11px] md:text-xs text-[#5a6f8a] font-semibold">
  //                 📊 Showing {dates.length} record{dates.length !== 1 ? 's' : ''}
  //               </p>
  //               <div className="flex gap-2">
  //                 <div className="w-16 h-1 rounded-full bg-[#f4df17]/30" />
  //                 <div className="w-8 h-1 rounded-full bg-[#f4df17]/60" />
  //                 <div className="w-4 h-1 rounded-full bg-[#f4df17] animate-pulse" />
  //               </div>
  //             </div>
  //           </div>
  //         )}

  //       </div>

  //     </div>
  //   </div>
  // );
  return (
   
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
                Important dates will be displayed here when available
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
