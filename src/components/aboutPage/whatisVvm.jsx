
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";



const methods = [
    {
        title: "Objective type Multiple Choice Questions",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <rect x="10" y="12" width="44" height="40" rx="6" />
                <path d="M18 22h20M18 30h20M18 38h12" />
                <circle cx="42" cy="38" r="4" />
            </svg>
        ),
    },
    {
        title: "Comprehensive writing",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <path d="M16 44l4-12 20-20 8 8-20 20-12 4z" />
                <path d="M36 16l8 8" />
            </svg>
        ),
    },
    {
        title: "Presentation and Group discussion",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <circle cx="22" cy="26" r="6" />
                <circle cx="42" cy="26" r="6" />
                <path d="M12 44c2-6 8-8 10-8s8 2 10 8" />
                <path d="M32 44c2-6 8-8 10-8s8 2 10 8" />
            </svg>
        ),
    },
    {
        title: "Role Play",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <path d="M20 20c6-6 18-6 24 0v16c-6 6-18 6-24 0z" />
                <path d="M24 28h4M36 28h4M26 36c4 2 8 2 12 0" />
            </svg>
        ),
    },
    {
        title: "Practical Examination",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <path d="M26 10v14l-10 18a6 6 0 006 8h20a6 6 0 006-8l-10-18V10" />
                <path d="M22 30h20" />
            </svg>
        ),
    },
    {
        title: "Methods of Science",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <circle cx="16" cy="32" r="4" />
                <circle cx="32" cy="16" r="4" />
                <circle cx="48" cy="32" r="4" />
                <circle cx="32" cy="48" r="4" />
                <path d="M20 32h24M32 20v24" />
            </svg>
        ),
    },
];

const WhatIsVvm = () => {
  return (
    <div className="font-sans">



      {/* ================= HERO CARD ================= */}
      <div className="bg-white mt-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11)]">

            {/* top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-6 sm:p-8 text-center">

              {/* Title */}
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#17395c] leading-tight">
                VIDYARTHI VIGYAN <span className="text-[#d13b2f]">MANTHAN</span>
              </h2>

              {/* Badge */}
              <span className="inline-block mt-4 px-4 py-1 rounded-full bg-[#f4df17]/20 border border-[#f4df17]/50 text-[#b88d00] text-xs font-extrabold">
                Largest Science Talent Search Examination
              </span>

              {/* Description */}
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#4f6480] text-justify">
                <strong className="text-[#17395c]">
                  Vidyarthi Vigyan Manthan (VVM)
                </strong>{" "}
                is an initiative of Vijnana Bharati (VIBHA), in collaboration
                with NCERT and NCSM under Government of India.
                <br />
                VVM is a national program to popularize science among school
                students (VI to XI), aiming to identify young scientific minds
                with strong aptitude and curiosity.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button className="px-5 py-2 rounded-full bg-gradient-to-br from-[#17395c] to-[#244d79] text-[#f4df17] text-xs font-extrabold shadow-lg hover:-translate-y-1 hover:text-white transition">
                  Learn More
                </button>
                <button className="px-5 py-2 rounded-full bg-white border border-[#17395c]/20 text-[#17395c] text-xs font-extrabold hover:border-[#f4df17]/60 hover:bg-[#fffde8] transition">
                  Explore
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= METHODS ================= */}
      <div className="bg-gray-100 py-12 mt-10">
        <div className="max-w-6xl mx-auto px-3">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {methods.map((method, index) => (
              <div key={index} className="flex justify-center">

                <div className="relative bg-white/80 border border-white/60 rounded-2xl p-5 backdrop-blur-md shadow-[0_14px_30px_rgba(31,60,91,0.09)] hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(23,57,92,0.14)] transition w-full max-w-[260px] text-center">

                  {/* top line */}
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

         
                  
                                    {/* ICON BOX */}
                                    <div className="
                                        w-[70px] h-[70px] mx-auto mb-4 rounded-[18px]
                                        bg-gradient-to-br from-[#17395c] to-[#244d79]
                                        flex items-center justify-center
                                        shadow-[0_10px_25px_rgba(23,57,92,0.25)]
                                    ">
                                        <div className="w-[40px] h-[40px]">
                                            {method.icon}
                                        </div>
                                    </div>

                  {/* title */}
                  <h5 className="text-sm font-semibold text-[#17395c] leading-snug">
                    {method.title}
                  </h5>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default WhatIsVvm;