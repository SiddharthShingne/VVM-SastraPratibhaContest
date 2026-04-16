/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";
// const ŚāstraPratibhāContest = () => {
//     return (
//         <div>
//             {/* About Heading */}
//             <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-26 text-center">
//                 <h1 className="text-6xl md:text-6xl font-extrabold text-[#111d35] mb-4">
//                     Śāstra Pratibhā Contest
//                 </h1>
//                 <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
//                     <Link href="/" className="hover:text-[#7f00ff] transition-colors">
//                         Home
//                     </Link>
//                     <ChevronRight className="w-3 h-3" />
//                     <span>About</span>
//                     <ChevronRight className="w-3 h-3" />
//                     <span className="text-[#111d35]">About VVM</span>
//                 </div>
//             </div>
//             {/* About Description */}
//             <div className="bg-white mt-10 pb-15 px-4 sm:px-6 lg:px-10">
//                 <div className="max-w-5xl mx-auto">
//                     <div className="bg-white shadow rounded-lg p-5 sm:p-7 font-[Euclid Circular,sans-serif]">
//                         <div className="text-center">
//                             <h2 className="text-3xl sm:text-4xl px-4 py-5 font-bold text-[#111d35] tracking-tight leading-tight">
//                                 Śāstra Pratibhā Contest (International Edition of VVM)
//                             </h2>
//                             <p className="text-gray-500 text-justify py-7 px-4 mt-4 mb-2 text-lg leading-relaxed font-light">
//                                 <strong className="font-semibold">
//                                     Vidyarthi Vigyan Manthan (International Edition of VVM){" "}
//                                 </strong>
//                                 is conducted in the Middle Eastern Countries namely Bahrain,
//                                 Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates
//                                 with the name of Śāstra Pratibhā Contest by Science India Forum,
//                                 an overseas unit of Vijnana Bharati. This year onwards, top 2
//                                 rankers (Class VI - XI) of the Śāstra Pratibhā Contest will also
//                                 participate in the National Level Camp Examination. These
//                                 students will be considered eligible for National Level Winners
//                                 (Himalayan) selection. A separate zone (Zone 5) will be created
//                                 for Middle Eastern Countries to declare Zonal Level Winners.
//                                 Zone 5 winners will be announced only if at least 6 students (in
//                                 a class) attend the National Level Camp.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default ŚāstraPratibhāContest;

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ŚāstraPratibhāContest = () => {
  return (
    <div>
      {/* HERO SECTION */}
      {/* <div className="bg-gradient-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#111d35] mb-4">
          Śāstra Pratibhā Contest
        </h1>

        <div className="flex justify-center items-center space-x-1 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-purple-600 transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>About</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111d35]">About VVM</span>
        </div>
      </div> */}

      {/* CONTENT SECTION */}
      <div className="bg-white mt-10 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">

          {/* GLASS HERO CARD */}
          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.7)] p-8">

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1.25 bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="text-center">

              {/* BADGES */}
              <div className="flex justify-center gap-3 mb-5 flex-wrap">
                <span className="px-4 py-1.5 rounded-full bg-linear-to-r from-[#17395c] to-[#244d79] text-[#f4df17] text-[10px] font-extrabold tracking-widest uppercase">
                  International Edition
                </span>

                <span className="px-4 py-1.5 rounded-full bg-linear-to-r from-[#f4df17] to-[#b88d00] border border-[#b88d00] text-[#17395c] text-[10px] font-extrabold uppercase">
                  Middle East Zone
                </span>
              </div>

              {/* TITLE */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17395c] leading-tight">
                Śāstra Pratibhā Contest{" "}
                <span className="text-[#d13b2f]">(VVM International)</span>
              </h2>

              {/* TAGLINE */}
              <p className="text-[#b88d00] font-semibold mt-2 text-sm">
                Inspiring Scientific Excellence Beyond Borders
              </p>

              {/* BODY TEXT */}
              <p className="text-[#4f6480] text-justify mt-6 text-base leading-relaxed font-medium">
                <strong className="text-[#17395c]">
                  Vidyarthi Vigyan Manthan (International Edition of VVM)
                </strong>{" "}
                is conducted in the Middle Eastern Countries namely Bahrain,
                Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates
                with the name of Śāstra Pratibhā Contest by Science India Forum,
                an overseas unit of Vijnana Bharati. This year onwards, top 2
                rankers (Class VI - XI) of the Śāstra Pratibhā Contest will also
                participate in the National Level Camp Examination. These
                students will be considered eligible for National Level Winners
                (Himalayan) selection. A separate zone (Zone 5) will be created
                for Middle Eastern Countries to declare Zonal Level Winners.
                Zone 5 winners will be announced only if at least 6 students (in
                a class) attend the National Level Camp.
              </p>

              {/* QUOTE BLOCK */}
              <div className="mt-6 flex gap-3 items-start bg-linear-to-br from-[#17395c]/5 to-[#f4df17]/10 p-4 rounded-r-xl border-l-4 border-[#f4df17]">
                <p className="text-sm text-[#4f6480] font-medium text-left">
                  Encouraging young minds globally to engage in science and
                  innovation through competitive excellence.
                </p>
              </div>

              {/* STATS */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex-1 min-w-30 bg-linear-to-r from-[#17395c] to-[#244d79] rounded-xl p-4 text-center shadow-md">
                  <span className="block text-lg font-extrabold text-[#f4df17]">
                    6+
                  </span>
                  <span className="text-xs text-white/80 font-semibold">
                    Countries
                  </span>
                </div>

                <div className="flex-1 min-w-30 bg-linear-to-r from-[#17395c] to-[#244d79] rounded-xl p-4 text-center shadow-md">
                  <span className="block text-lg font-extrabold text-[#f4df17]">
                    Top 2
                  </span>
                  <span className="text-xs text-white/80 font-semibold">
                    Rankers
                  </span>
                </div>

                <div className="flex-1 min-w-30 bg-linear-to-r from-[#17395c] to-[#244d79] rounded-xl p-4 text-center shadow-md">
                  <span className="block text-lg font-extrabold text-[#f4df17]">
                    Zone 5
                  </span>
                  <span className="text-xs text-white/80 font-semibold">
                    International
                  </span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-4 mt-8 flex-wrap">
                <button className="px-6 py-2.5 rounded-full bg-linear-to-r from-[#17395c] to-[#244d79] text-[#f4df17] text-sm font-extrabold shadow-lg hover:-translate-y-1 hover:text-white transition">
                  Learn More
                </button>

                <button className="px-6 py-2.5 rounded-full bg-white border border-[#17395c]/20 text-[#17395c] text-sm font-extrabold hover:border-yellow-400 hover:bg-yellow-50 transition">
                  Explore VVM
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ŚāstraPratibhāContest;
