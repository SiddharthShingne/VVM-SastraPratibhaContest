
"use client";
import Link from "next/link";
import React from "react";

const PostersAdvertisements: React.FC = () => {
  return (
    <div className="font-open">

      {/* 🔹 Breadcrumb */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">

            <h6 className="text-white text-[27px] font-medium mb-1">
              Posters/Advertisements
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
                  <Link href="/downloads" className="hover:underline">
                    Downloads
                  </Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li>Posters/Advertisements</li>

              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* 🔹 Main Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">

          {/* Card */}
          <div className="
            relative rounded-[28px] overflow-hidden
            bg-white/70 backdrop-blur-xl border border-white/60
            shadow-[0_22px_50px_rgba(23,57,92,0.11)]
          ">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] 
              bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8 text-center">

              {/* Title */}
              <h2 className="text-[32px] font-extrabold text-[#17395c] mb-6">
                Download Brochure
              </h2>

              {/* Divider */}
              <div className="h-[1px] bg-[#17395c]/10 my-6"></div>

              {/* Downloads */}
              <ul className="space-y-4 text-[16px]">

                <li>
                  <strong>Trifold Brochure (English):</strong>
                  <a
                    href="/assets/pdf/TRIFOLD BROCHURE English.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 font-bold text-[#17395c] hover:text-[#b88d00] hover:underline"
                  >
                    Download Here
                  </a>
                </li>

                <li>
                  <strong>Trifold Brochure (Hindi):</strong>
                  <a
                    href="/assets/pdf/TRIFOLD BROCHURE Hindi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 font-bold text-[#17395c] hover:text-[#b88d00] hover:underline"
                  >
                    Download Here
                  </a>
                </li>

              </ul>

            </div>
          </div>

        </div>
      </div>

      {/* 🔹 Separator */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-[#17395c]/10" />
      </div>

    </div>
  );
};

export default PostersAdvertisements;
