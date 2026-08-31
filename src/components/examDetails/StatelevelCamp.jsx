
"use client";
import React from "react";

import Link from "next/link";

const StateLevelCamp = () => {
  return (
    <div>

      {/* Breadcrumb Section */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">

            <h6 className="text-white text-[27px] font-medium mb-1">
              State Level Camp
            </h6>

            <nav>
              <ol className="flex items-center text-white text-[12px] whitespace-nowrap">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li>
                  <Link href="/exam-details" className="hover:underline">
                    Exam Details
                  </Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li className="text-white">State Level Camp</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 my-5">

          {/* Glass Card */}
          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8 space-y-5">

              {/* Title */}
              {/* <h2 className="text-[32px] font-black text-[#17395c] text-center mb-4">
                State Level Camp (SLC): Level-III
              </h2> */}

              <h2 className="text-[32px] font-black text-[#17395c] text-center mb-4">
                State Level Camp (SLC): Level-III
              </h2>

              {/* Content */}
              <p className="text-[17px] leading-[1.8] text-[#4f6480]">
                The top 25 rankers from each class for every state will be
                identified to participate in the one or two-day State Level Camp
                (SLC). The camp will be organized at a suitable location within
                the state.
              </p>

              <p className="text-[17px] leading-[1.8] text-[#4f6480]">
                The State Level Camp focuses on application-oriented multiple
                choice questions, hands-on activities, observation and analysis,
                situational problem-solving ability, and various other
                activities. States may be clubbed based on participation,
                geographical proximity, and cultural similarities.
              </p>

              <p className="text-[17px] leading-[1.8] text-[#4f6480]">
                Selected students will have to bear their travel expenses. No
                travel support will be provided. Venue and further details will
                be updated on the website and communicated by the respective
                state coordinators.
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-[#17395c1a] my-6"></div>

              {/* Highlight Blocks */}
              <div className="space-y-4">

                <p className="text-[17px] leading-[1.8] text-[#4f6480]">
                  <strong>Displaying the Marks Obtained/Secured:</strong>{" "}
                  Marks will be available on the student dashboard one week
                  after the result declaration.
                </p>

                <p className="text-[17px] leading-[1.8] text-[#4f6480]">
                  <strong>Tiebreaker:</strong> In case of a tie, students will
                  be invited for a Viva-Voce consisting of three questions. The
                  highest scorer will be declared the winner.
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default StateLevelCamp;