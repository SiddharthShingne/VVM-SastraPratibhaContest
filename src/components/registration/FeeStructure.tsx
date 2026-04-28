
"use client";

import Link from "next/link";

export default function FeeStructure() {
  return (
    <div className="min-h-screen pb-12.5">

      {/* ================= Breadcrumb ================= */}
      <div className="bg-[#162a4a] py-12.5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-16.25">

            <h6 className="text-white text-[27px] font-medium mb-1">
              Fee Structure
            </h6>

            <nav>
              <ol className="flex items-center gap-2 text-white text-[12px] whitespace-nowrap">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li>{">"}</li>

                <li>
                  <Link href="/registration" className="hover:underline">
                    Registration
                  </Link>
                </li>

                <li>{">"}</li>

                <li className="text-white">Fee Structure</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 my-5">

          {/* Card */}
          <div className="relative rounded-[28px] overflow-hidden 
              bg-white/70 border border-white/60 backdrop-blur-md 
              shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)]
              mb-20">

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1.25 
              bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center mb-5">
                FEE STRUCTURE
              </h2>

              {/* List */}
              <ul className="mt-2 pl-5 list-disc marker:text-[#17395c]">

                <li className="text-[16px] leading-8 text-[#4f6480] mb-3">
                  Students registering individually or through school will have
                  to pay a fee of{" "}
                  <strong>Rs. 200/- (Rupees Two Hundred Only)</strong>.
                  <br />
                  <span className="text-[#d13b2f] text-[14px] font-semibold">
                    * Applicable only for students currently studying in India.
                  </span>
                </li>

                <li className="text-[16px] leading-8 text-[#4f6480]">
                  School/Institute coordinator is requested to retain{" "}
                  <strong>Rs. 30/- per student</strong> as a service charge, and
                  the remaining amount must be transferred via Online/Offline
                  payment to the VVM Delhi office.
                  <br />
                  <span className="text-[#d13b2f] text-[14px] font-semibold">
                    * Applicable only for students in India; for Indian students
                    abroad, contact your respective Science India/International
                    unit.
                  </span>
                </li>

              </ul>

              {/* Divider */}
              <div className="h-px bg-[#17395c]/10 my-8"></div>

              {/* Subtitle */}
              <h4 className="text-[20px] font-extrabold text-[#17395c] mt-6">
                Modes of Fee Payment
              </h4>

              <p className="text-[17px] leading-8 text-[#4f6480] mt-2">
                Fee can be paid through payment gateway, ONLINE (RTGS/NEFT), or
                Challan payment only.
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Spacer */}
      <div className="max-w-5xl mx-auto mt-5 mb-20"></div>

    </div>
  );
}