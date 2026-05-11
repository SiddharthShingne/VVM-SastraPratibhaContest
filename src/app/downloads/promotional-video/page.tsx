

"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const PromotionalVideo: React.FC = () => {
  return (
    <div className="font-open">

      {/* 🔹 Breadcrumb */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">
            
            <h6 className="text-white text-[27px] font-medium mb-1">
              Promotional Video
            </h6>

            <nav>
              <ol className="flex items-center text-white text-[12px] whitespace-nowrap">
                <li>
                  <Link href="/">Home</Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li>
                  <Link href="/downloads">Downloads</Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li>Promotional Video</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* 🔹 Main Section */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">

          {/* Card */}
          <div className="
            relative rounded-[28px] overflow-hidden
            bg-white/70 backdrop-blur-xl border border-white/60
            shadow-[0_22px_50px_rgba(23,57,92,0.11)]
          ">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] 
              bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8">

              {/* Title */}
              <h2 className="text-[32px] font-extrabold text-[#17395c] text-center mb-6">
                Promotional Video & Resources
              </h2>

              {/* 🎥 Video */}
              <div className="relative max-w-[700px] mx-auto rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(23,57,92,0.15)]">

                <Image
                  src="/gallery/promotional-video.jpg"
                  alt="Promotional Video"
                  width={700}
                  height={400}
                  className="w-full h-auto"
                />

                {/* Play Button */}
                <a
                  href="https://www.youtube.com/watch?v=KzoUkuODAP0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    absolute top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2
                    w-[70px] h-[70px]
                    rounded-full
                    bg-gradient-to-br from-[#17395c] to-[#244d79]
                    text-[#f4df17] text-[28px] font-bold
                    flex items-center justify-center
                    shadow-[0_10px_25px_rgba(23,57,92,0.3)]
                    transition duration-300
                    hover:scale-110 hover:text-white
                  "
                >
                  ▶
                </a>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#17395c]/10 my-8"></div>

              {/* 📥 Downloads */}
              {/* <ul className="text-center space-y-3">

                <li className="text-[16px]">
                  <strong>Mobile Video:</strong>
                  <a
                    href="https://www.dropbox.com/scl/fi/4ev2ir6v8bj1oxaxbf5p9/VVM-Promo-Mobile.mp4?dl=0"
                    target="_blank"
                    className="ml-2 font-bold text-[#17395c] hover:text-[#b88d00] hover:underline"
                  >
                    Download Here
                  </a>
                </li>

                <li className="text-[16px]">
                  <strong>High Resolution Video:</strong>
                  <a
                    href="https://www.dropbox.com/scl/fi/mm2tgb4zvj8ro8wq4cwiz/VVM-Promo-Youtube.mp4?dl=0"
                    target="_blank"
                    className="ml-2 font-bold text-[#17395c] hover:text-[#b88d00] hover:underline"
                  >
                    Download Here
                  </a>
                </li>

                <li className="text-[16px]">
                  <strong>VVM Logo:</strong>
                  <a
                    href="https://www.dropbox.com/scl/fi/zn37js51xutbget9q6uzx/Logo-of-VVM.png?dl=0"
                    target="_blank"
                    className="ml-2 font-bold text-[#17395c] hover:text-[#b88d00] hover:underline"
                  >
                    Download Here
                  </a>
                </li>

              </ul> */}

            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="my-0 border-[#17395c]/10" />
      </div>

    </div>
  );
};

export default PromotionalVideo;