/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { getImportantDates } from "@/services/importantDatesService";
import { getInstractionDocument } from "@/services/importantDatesService";

import { createPaymentLink } from "@/services/uaeService";
interface DateItem {
  id: number;
  name: string;
  detail: string;
}

const PAYMENT_ENABLED_COUNTRIES = [2, 3, 6]; // UAE, Oman, Bahrain

export default function DashboardHome() {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [instruction, setInstruction] = useState<string>("");
  const [instructionLoading, setInstructionLoading] = useState(true);

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }
  function extractNameFromStorage(): string {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return "Student";
      const parsed = JSON.parse(raw);
      const name =
        parsed?.user?.user_detail?.name ||
        parsed?.user_detail?.name ||
        "Student";
      // Capitalize each word — API returns lowercase "siddharth rajendra shingne"
      return name
        .split(" ")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    } catch (err) {
      console.error("extractNameFromStorage error:", err);
      return "Student";
    }
  }


  const [payLoading, setPayLoading] = useState(false);


  async function handleDoPayments() {
    try {
      setPayLoading(true);
      const result = await createPaymentLink();
      console.log("Payment API result:", result);

      if (result.success && result.paymentLink) {
        window.location.href = result.paymentLink;
      } else {
        alert("Payment link generate nahi ho saka. Support se contact karein.");
        console.error("Payment link not returned properly:", result);
      }
    } catch (err) {
      console.error("handleDoPayments error:", err);
    } finally {
      setPayLoading(false);
    }
  }


  // async function handleDoPayments() {
  //   try {
  //     setPayLoading(true);
  //     const result = await createPaymentLink();
  //     console.log("Payment API result:", result);

  //     if (result.success && result.paymentLink) {
  //       window.open(result.paymentLink, "_blank");
  //     } else {
  //       alert("Payment link generate nahi ho saka. Support se contact karein.");
  //       console.error("Payment link not returned properly:", result);
  //     }
  //   } catch (err) {
  //     console.error("handleDoPayments error:", err);
  //   } finally {
  //     setPayLoading(false);
  //   }
  // }


  // async function handleDoPayments() {
  //   try {
  //     setPayLoading(true);
  //     const raw = localStorage.getItem("user");
  //     const parsed = raw ? JSON.parse(raw) : null;

  //     const studentId =
  //       parsed?.user?.user_detail?.id || parsed?.user_detail?.id;
  //     const countryId =
  //       parsed?.user?.country_id ?? parsed?.country_id;

  //     if (!studentId) {
  //       console.error("student_id not found in localStorage");
  //       return;
  //     }

  //     const result = await createPaymentLink({
  //       student_id: studentId,
  //       country_id: countryId,
  //     });
  //     console.log("Payment API result:", result);

  //     if (result.success && result.paymentLink) {
  //       window.open(result.paymentLink, "_blank");
  //     } else {
  //       console.error("Payment link not returned properly:", result);
  //     }
  //   } catch (err) {
  //     console.error("handleDoPayments error:", err);
  //   } finally {
  //     setPayLoading(false);
  //   }
  // }


  // async function handleDoPayments() {
  //   try {
  //     setPayLoading(true);
  //     const raw = localStorage.getItem("user");
  //     const parsed = raw ? JSON.parse(raw) : null;
  //     const studentId =
  //       parsed?.user?.user_detail?.id || parsed?.user_detail?.id;

  //     if (!studentId) {
  //       console.error("student_id not found in localStorage");
  //       return;
  //     }

  //     const result = await createPaymentLink({ student_id: studentId });
  //     console.log("Payment API result:", result);

  //     if (result.success && result.paymentLink) {
  //       window.open(result.paymentLink, "_blank");
  //     } else {
  //       console.error("Payment link not returned properly:", result);
  //     }
  //   } catch (err) {
  //     console.error("handleDoPayments error:", err);
  //   } finally {
  //     setPayLoading(false);
  //   }
  // }

    const [name, setName] = useState("Student");
    const [greeting, setGreeting] = useState("Good Afternoon");

    // useEffect(() => {
    //   setName(extractNameFromStorage());
    //   setGreeting(getGreeting());
    // }, []);


  const [countryId, setCountryId] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<number | null>(null);

  useEffect(() => {
    setName(extractNameFromStorage());
    setGreeting(getGreeting());

    try {
      const raw = localStorage.getItem("user");
      const parsed = raw ? JSON.parse(raw) : null;

      const cid =
        parsed?.user?.user_detail?.state?.country_id ??
        parsed?.user?.country_id ??
        null;
      setCountryId(cid);

      const pStatus = parsed?.user?.user_detail?.payment_status ?? null;
      setPaymentStatus(pStatus);
    } catch (err) {
      console.error("countryId/paymentStatus extract error:", err);
      setCountryId(null);
      setPaymentStatus(null);
    }
  }, []);

  
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
    <div className="space-y-6">

      {/* WELCOME CARD */}
    

        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_22px_50px_rgba(23,57,92,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden p-6 md:p-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] z-10" />

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-semibold text-[#17395c] flex items-center gap-1.5">
                {greeting}, <span className="text-base">👋</span>
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-[#17395c] tracking-tight leading-tight mt-1">
                {name}
              </h1>
              <p className="text-sm text-[#8a99ac] mt-1.5">
                Keep learning and stay ahead!
              </p>
              <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#17395c] to-[#f4df17] mt-3" />
            </div>
            {countryId !== null &&
              PAYMENT_ENABLED_COUNTRIES.includes(countryId) &&
              paymentStatus === 0 && (
                <button
                  onClick={handleDoPayments}
                  disabled={payLoading}
                  className="shrink-0 flex items-center gap-2 text-sm font-semibold text-white bg-[#17395c] hover:bg-[#1f4e7a] disabled:opacity-50 px-4 py-2.5 rounded-xl transition-colors duration-200"
                >
                  {payLoading ? "Processing..." : "💳 Do Payments"}
                </button>
              )}
          </div>
        </div>

      {/* IMPORTANT DATES CARD */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-white/60 shadow-[0_22px_50px_rgba(23,57,92,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden transition-all duration-300 hover:shadow-[0_28px_60px_rgba(23,57,92,0.1),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] z-10" />

        <div className="p-6 md:p-8"></div>

        {/* HEADER — icon + title left, action button right */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#17395c] flex items-center justify-center shrink-0">
              <span className="text-lg">📅</span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#17395c] tracking-tight leading-none">
                Important Dates
              </h2>
              <p className="text-[13px] text-[#9aa9bc] mt-1">
                Stay updated with key academic events
              </p>
            </div>
          </div>

          <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#17395c] bg-[#eaf1fb] hover:bg-[#dde9f8] px-4 py-2 rounded-xl transition-colors duration-200">
            📅 View Calendar
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="rounded-2xl bg-white border border-[#eef2f8] shadow-[0_4px_20px_rgba(23,57,92,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(23,57,92,0.08)]">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                {dates.length > 0 && (
                  <tr className="bg-[#17395c] border-b-2 border-[#f4df17]">
                    <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                      Sr. No.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                      Detail
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-extrabold text-white uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                )}
              </thead>

              <tbody className="divide-y divide-[#f0f3f8]">
                {dates.map((item, index) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-[#fefdf5] transition-all duration-200 cursor-pointer"
                  >
                    <td className="px-6 py-4 text-[#7a8fa6] font-medium">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#eaf1fb] group-hover:bg-[#f4df17]/10 text-xs font-bold text-[#17395c] transition-colors duration-200">
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

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17395c] bg-[#eaf1fb] px-3 py-1.5 rounded-lg whitespace-nowrap">
                        📅 
                                              </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {dates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f4df17]/20 to-[#17395c]/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#f8fafc] to-[#fefdf5] flex items-center justify-center shadow-lg border border-[#e6ecf3]">
                  <span className="text-3xl">📅</span>
                </div>
              </div>

              <h3 className="text-[#17395c] font-bold text-lg mb-2">
                Important dates will be displayed here when available
              </h3>

              <p className="text-[#9aa9bc] text-sm max-w-xs">
                New updates and important deadlines will appear here as they become available.
              </p>

              <div className="flex gap-2 mt-6">
                <div className="w-1 h-1 rounded-full bg-[#f4df17]/40" />
                <div className="w-1 h-1 rounded-full bg-[#17395c]/30" />
                <div className="w-1 h-1 rounded-full bg-[#f4df17]/40" />
              </div>
            </div>
          )}

          {/* FOOTER — record count + pagination */}
          {dates.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3 bg-[#fefdf5] border-t border-[#eef2f8]">
              <p className="text-[11px] text-[#9aa9bc] font-medium">
                Showing {dates.length} event{dates.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e6ecf3] text-[#9aa9bc] hover:bg-white transition-colors duration-200">
                  ‹
                </button>
                <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#17395c] text-white text-xs font-bold">
                  1
                </span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e6ecf3] text-[#9aa9bc] hover:bg-white transition-colors duration-200">
                  ›
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );


//   return (
   
//   <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_22px_50px_rgba(23,57,92,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden transition-all duration-300 hover:shadow-[0_28px_60px_rgba(23,57,92,0.1),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5">
  
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] z-10" />

      
//   <div className="p-8">
    
//     <div className="text-center mb-8 relative">
      

//       <h2 className="text-2xl md:text-3xl font-black bg-linear-to-r from-[#17395c] via-[#1f4e7a] to-[#b88d00] bg-clip-text text-transparent mb-3">
//         Important Dates
//       </h2>

//       <div className="flex justify-center mt-2">
//         <div className="w-20 h-0.75 rounded-full bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />
//       </div>
      
//       <p className="text-[12px] text-[#9aa9bc] mt-3">
//         Stay updated with key academic events
//       </p>
//     </div>

//     <div className="rounded-2xl bg-white border border-[#eef2f8] shadow-[0_4px_20px_rgba(23,57,92,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(23,57,92,0.08)]">
      
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
          
//           <thead>
//             {dates.length > 0 && (
//               <tr className="bg-linear-to-r from-[#f8fafc] to-[#fefdf5] border-b-2 border-[#f4df17]/30">
//                 <th className="px-6 py-4 text-left text-xs font-extrabold text-[#17395c] uppercase tracking-wider">
//                   Sr. No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-extrabold text-[#17395c] uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-extrabold text-[#17395c] uppercase tracking-wider">
//                   Detail
//                 </th>
//               </tr>
//             )}
//           </thead>

//           <tbody className="divide-y divide-[#f0f3f8]">
//             {dates.map((item, index) => (
//               <tr
//                 key={item.id}
//                 className="group hover:bg-linear-to-r hover:from-[#fefdf5] hover:to-[#f8fafc] transition-all duration-200 cursor-pointer"
//               >
//                 <td className="px-6 py-4 text-[#7a8fa6] font-medium">
//                   <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f8fafc] group-hover:bg-[#f4df17]/10 text-xs font-bold text-[#17395c] transition-colors duration-200">
//                     {index + 1}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4">
//                   <span className="font-bold text-[#17395c] group-hover:text-[#1f4e7a] transition-colors duration-200">
//                     {item.name}
//                   </span>
//                 </td>

               

//                 <td className="px-6 py-4 text-[#5a6f8a] leading-relaxed">
//                   {item.detail}
//                 </td>

//                 <td className="px-6 py-4">
//                   <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17395c] bg-[#eaf1fb] px-3 py-1.5 rounded-lg">
//                     📅 
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {dates.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-16 text-center">
          
//           <div className="relative mb-6">
//             <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#f4df17]/20 to-[#17395c]/20 animate-ping" />
//             <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-[#f8fafc] to-[#fefdf5] flex items-center justify-center shadow-lg border border-[#e6ecf3]">
//               <span className="text-3xl">📅</span>
//             </div>
//           </div>

//           <h3 className="text-[#17395c] font-bold text-lg mb-2">
//                 Important dates will be displayed here when available
//           </h3>

//           <p className="text-[#9aa9bc] text-sm max-w-xs">
//             New updates and important deadlines will appear here as they become available.
//           </p>
          
//           <div className="flex gap-2 mt-6">
//             <div className="w-1 h-1 rounded-full bg-[#f4df17]/40" />
//             <div className="w-1 h-1 rounded-full bg-[#17395c]/30" />
//             <div className="w-1 h-1 rounded-full bg-[#f4df17]/40" />
//           </div>
//         </div>
//       )}
      
//       {dates.length > 0 && (
//         <div className="px-6 py-3 bg-[#fefdf5] border-t border-[#eef2f8]">
//           <p className="text-[11px] text-[#9aa9bc] font-medium">
//             Showing {dates.length} record{dates.length !== 1 ? 's' : ''}
//           </p>
//         </div>
//       )}
      
//     </div>

//   </div>
// </div>
//   );
}          
