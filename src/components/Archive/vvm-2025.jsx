"use client";

import Link from "next/link";

export default function VVMArchivePage2025() {
  return (
    <div>
      {/* ================= Breadcrumb ================= */}
      <div className="bg-[#162a4a] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">

            <h6 className="text-white text-[27px] font-medium mb-1">
              VVM 2025
            </h6>

            <nav>
              <ol className="flex items-center text-white text-xs space-x-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li>&gt;</li>

                <li>
                  <Link href="/archive" className="hover:underline">
                    Archive
                  </Link>
                </li>

                <li>&gt;</li>

                <li className="text-white">VVM 2025</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* ================= Section ================= */}
      <div className="py-16 bg-[#f7f9fc]">
        <div className="max-w-4xl mx-auto px-4">

          {/* Glass Card */}
          <div className="relative rounded-[28px] overflow-hidden 
            bg-white/70 border border-white/60 backdrop-blur-md 
            shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)]
            text-center mb-16">

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 h-[5px] w-full 
              bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8">

              <h2 className="text-[32px] font-black text-[#17395c] mb-5">
                School Level Winners for VVM 2025–26
              </h2>

              <p className="text-[17px] leading-8 text-[#4f6480]">
                Please log in to your school or student dashboard to check the results.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-6">

                {/* Login Button */}
                <a
                  href="https://archive-2526.vvmstage.cloud/Login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center 
                    px-7 py-3 text-[15px] font-extrabold rounded-[14px]
                    bg-gradient-to-br from-[#17395c] to-[#1f4e7a] text-white
                    shadow-[0_6px_20px_rgba(23,57,92,0.30),inset_0_1px_0_rgba(255,255,255,0.18)]
                    hover:from-[#1f4e7a] hover:to-[#17395c]
                    hover:shadow-[0_10px_30px_rgba(23,57,92,0.40)]
                    hover:text-[#f4df17] hover:-translate-y-[2px]
                    active:scale-95 transition-all duration-300
                    overflow-hidden group"
                >
                  Login

                  <span className="absolute top-0 left-[-75%] w-1/2 h-full 
                    bg-gradient-to-r from-transparent via-white/40 to-transparent 
                    skew-x-[-20deg] group-hover:left-[130%] transition-all duration-500" />
                </a>

                {/* Visit Website */}
                <a
                  href="https://archive-2526.vvmstage.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center 
                    px-7 py-3 text-[15px] font-extrabold rounded-[14px]
                    bg-white/60 border border-[#17395c] text-[#17395c]
                    backdrop-blur-md
                    shadow-[0_6px_20px_rgba(23,57,92,0.10),inset_0_1px_0_rgba(255,255,255,0.72)]
                    hover:bg-gradient-to-br hover:from-[#f4df17] hover:to-[#e8cc00]
                    hover:border-[#e8cc00]
                    hover:text-[#17395c]
                    hover:shadow-[0_10px_30px_rgba(244,223,23,0.40)]
                    hover:-translate-y-[2px]
                    active:scale-95 transition-all duration-300
                    overflow-hidden group"
                >
                  Visit Website

                  <span className="absolute top-0 left-[-75%] w-1/2 h-full 
                    bg-gradient-to-r from-transparent via-white/40 to-transparent 
                    skew-x-[-20deg] group-hover:left-[130%] transition-all duration-500" />
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

