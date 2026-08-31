
"use client";
import React from "react";
import Link from "next/link";

const UnfairMeans = () => {
  return (
    <div className="min-h-screen">

      {/* Breadcrumb Section */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">

            <h6 className="text-white text-[27px] font-medium mb-1 md:pl-40">
              Unfair Means
            </h6>

            <nav>
              <ol className="flex items-center text-white text-[12px] whitespace-nowrap md:pl-40">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li>Exam Details</li>

                <li className="mx-2">{">"}</li>

                <li className="text-white">Unfair Means</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-16">
        <div className="bg-white w-500px md:px-40 p-6">

          {/* Glass Card */}
          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center mb-5">
                Unfair Means
              </h2>

              {/* Intro */}
              <p className="text-[17px] leading-[1.8] text-[#4f6480] mt-2">
                To prevent the use of unfair means during  Online
                Examinations, the following measures will be implemented:
              </p>

              {/* List */}
              <ul className="mt-4 pl-5 list-disc space-y-3 text-[#4f6480] text-[16px] leading-[1.8] marker:text-[#17395c]">
                {/* <li>
                  <strong>Invigilator Visit:</strong> Invigilators will visit schools
                  during the selected time slot. Guidelines and visit details will
                  be shared one week before the exam.
                </li> */}

                <li>
                  <strong>Tab Switching and Unfair Activities :</strong>  If a user switches tabs more than 5 times,
                  the exam will be automatically submitted. Additionally, attempting to access the internet, enable Wi-Fi, or perform
                  any unfair activity during the exam may lead to automatic submission of the exam.
                </li>
              </ul>

              {/* Divider */}
              <div className="h-[1px] bg-[#17395c1a] my-8"></div>

              {/* Note */}
              <p className="text-[#d13b2f] text-[14px] font-semibold">
                Students are expected to follow all guidelines to ensure a fair examination process.
              </p>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default UnfairMeans;