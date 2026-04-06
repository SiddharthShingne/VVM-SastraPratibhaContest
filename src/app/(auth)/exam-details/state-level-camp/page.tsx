
// "use client";

// import Link from "next/link";

// export default function StateLevelCampPage() {
//   return (
//     <div>
//       {/* ================= Breadcrumb ================= */}
//       <div className="bg-[#162a4a] py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex flex-col justify-center min-h-[65px]">
            
//             <h6 className="text-white text-[27px] font-medium mb-1">
//               State Level Camp
//             </h6>

//             <nav>
//               <ol className="flex items-center text-white text-xs space-x-2">
//                 <li>
//                   <Link href="/" className="hover:underline">
//                     Home
//                   </Link>
//                 </li>

//                 <li>{">"}</li>

//                 <li>
//                   <Link href="/exam-details" className="hover:underline">
//                     Exam Details
//                   </Link>
//                 </li>

//                 <li>{">"}</li>

//                 <li>State Level Camp</li>
//               </ol>
//             </nav>

//           </div>
//         </div>
//       </div>

//       {/* ================= Content Section ================= */}
//       <div className="bg-white py-16">
//         <div className="max-w-4xl mx-auto px-4">

//           {/* Glass Card */}
//           <div
//             className="relative rounded-[28px] overflow-hidden
//             bg-white/70 border border-white/60 backdrop-blur-md
//             shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)]
//             mb-16"
//           >

//             {/* Top Gradient Line */}
//             <div className="absolute top-0 left-0 h-[5px] w-full 
//               bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

//             <div className="p-8">

//               {/* Title */}
//               <h2 className="text-[32px] font-black text-[#17395c] text-center mb-5">
//                 State Level Camp (SLC): Level-III
//               </h2>

//               {/* Paragraphs */}
//               <p className="text-[17px] leading-8 text-[#4f6480] mt-2">
//                 The top 25 rankers from each class for every state will be
//                 identified to participate in the one or two-day State Level
//                 Camp (SLC). The camp will be organized at a suitable location
//                 within the state.
//               </p>

//               <p className="text-[17px] leading-8 text-[#4f6480] mt-4">
//                 The State Level Camp focuses on application-oriented multiple
//                 choice questions, hands-on activities, observation and analysis,
//                 situational problem-solving ability, and various other
//                 activities. States may be clubbed based on participation,
//                 geographical proximity, and cultural similarities for better
//                 coordination and convenience.
//               </p>

//               <p className="text-[17px] leading-8 text-[#4f6480] mt-4">
//                 Selected students will have to bear their travel expenses to
//                 attend the camp. No travel support will be provided. Venue and
//                 further details will be updated on the website and communicated
//                 by the respective state coordinators.
//               </p>

//               {/* Divider */}
//               <div className="h-[1px] bg-[#17395c1a] my-8" />

//               {/* Highlight Block 1 */}
//               <div className="mt-6">
//                 <p className="text-[17px] leading-8 text-[#4f6480]">
//                   <strong className="text-[#17395c]">
//                     Displaying the Marks Obtained/Secured:
//                   </strong>{" "}
//                   Marks will be available on the student dashboard one week
//                   after the result declaration. Students can log in to their
//                   VVM account to check their scores.
//                 </p>
//               </div>

//               {/* Highlight Block 2 */}
//               <div className="mt-6">
//                 <p className="text-[17px] leading-8 text-[#4f6480]">
//                   <strong className="text-[#17395c]">
//                     Tiebreaker:
//                   </strong>{" "}
//                   In case of a tie, students will be invited for a Viva-Voce
//                   consisting of three questions. The student scoring the
//                   highest marks will be declared the winner.
//                 </p>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Separator */}
//       <div className="max-w-6xl mx-auto px-4">
//         <hr className="my-6" />
//       </div>
//     </div>
//   );
// }