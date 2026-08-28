
// "use client";
// import Link from "next/link";
// import React from "react";

// const PostersAdvertisements: React.FC = () => {
//   return (
//     <div className="font-open">

//       <div className="bg-[#162a4a] py-[50px]">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex flex-col justify-center min-h-[65px]">

//             <h6 className="text-white text-[27px] font-medium mb-1">
//               Posters/Advertisements
//             </h6>

//             <nav>
//               <ol className="flex items-center text-white text-[12px] whitespace-nowrap">

//                 <li>
//                   <Link href="/" className="hover:underline">
//                     Home
//                   </Link>
//                 </li>

//                 <li className="mx-2">{">"}</li>

//                 <li>
//                   <Link href="/downloads" className="hover:underline">
//                     Downloads
//                   </Link>
//                 </li>

//                 <li className="mx-2">{">"}</li>

//                 <li>Posters/Advertisements</li>

//               </ol>
//             </nav>

//           </div>
//         </div>
//       </div>


//       <div className="bg-white py-16">
//         <div className="max-w-4xl mx-auto px-4">


//           <div className="
//             relative rounded-[28px] overflow-hidden
//             bg-white/70 backdrop-blur-xl border border-white/60
//             shadow-[0_22px_50px_rgba(23,57,92,0.11)]
//           ">


//             <div className="absolute top-0 left-0 w-full h-[5px]
//               bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

//             <div className="p-8 text-center">

//               <h2 className="text-[32px] font-extrabold text-[#17395c] mb-6">
//                 Download Brochure
//               </h2>

//               <div className="h-[1px] bg-[#17395c]/10 my-6"></div>

//               <ul className="space-y-4 text-[16px]">
//              <li>
//                   <strong>Brochure 2026-27:</strong>
//                   <a
//                     href="/pdf/Brochure2026-27.pdf"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     download
//                     className="ml-2 font-bold text-[#17395c] hover:text-[#b88d00] hover:underline"
//                   >
//                     View / Download
//                   </a>
//                 </li>


//               </ul>

//             </div>
//           </div>

//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4">
//         <hr className="border-[#17395c]/10" />
//       </div>

//     </div>
//   );
// };

// export default PostersAdvertisements;



"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { X, Download, ZoomIn } from "lucide-react";

const posters = [
  { src: "/gallery/poster_1.jpeg", name: "Poster_1.jpeg" },
  { src: "/gallery/poster_2.jpeg", name: "Poster_2.jpeg" },
];

const PostersAdvertisements: React.FC = () => {
  const [zoomImg, setZoomImg] = useState<string | null>(null);

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
                  <strong>Brochure 2026-27:</strong>

                  <a href="/pdf/Brochure2026-27.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="ml-2 font-bold text-[#17395c] hover:text-[#b88d00] hover:underline"
                  >
                    View / Download
                  </a>
                </li>
              </ul>

            </div>
          </div>

          {/* 🔹 Posters Gallery */}
          <div className="mt-12">
            <h3 className="text-[24px] font-extrabold text-[#17395c] mb-6 text-center">
              Posters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posters.map((poster) => (
                <div
                  key={poster.src}
                  className="
                    relative rounded-[20px] overflow-hidden group
                    bg-white/70 backdrop-blur-xl border border-white/60
                    shadow-[0_14px_35px_rgba(23,57,92,0.10)]
                  "
                >
                  <div className="relative w-full h-[320px]">
                    <Image
                      src={poster.src}
                      alt={poster.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />

                    {/* Hover overlay */}
                    <div className="
                      absolute inset-0 bg-black/40 opacity-0
                      group-hover:opacity-100 transition-opacity duration-200
                      flex items-center justify-center gap-4
                    ">
                      <button
                        onClick={() => setZoomImg(poster.src)}
                        className="
                          flex items-center justify-center w-11 h-11 rounded-full
                          bg-white text-[#17395c] hover:bg-[#f4df17] transition-colors
                        "
                        aria-label="Enlarge poster"
                      >
                        <ZoomIn size={20} />
                      </button>


                      <a href={poster.src}
                        download={poster.name}
                        className="
                    flex items-center justify-center w-11 h-11 rounded-full
                    bg-white text-[#17395c] hover:bg-[#f4df17] transition-colors
                    "
                        aria-label="Download poster"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div >

      {/* 🔹 Separator */}
      < div className="max-w-6xl mx-auto px-4" >
        <hr className="border-[#17395c]/10" />


        {/* 🔹 Zoom Modal */}
        {
          zoomImg && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setZoomImg(null)}
            >
              <button
                onClick={() => setZoomImg(null)}
                className="absolute top-6 right-6 text-white hover:text-[#f4df17]"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              <div
                className="relative w-full max-w-4xl h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={zoomImg}
                  alt="Enlarged poster"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>


              <a href={zoomImg}
                download
                className="
      absolute bottom-6 flex items-center gap-2 px-5 py-2.5 rounded-full
      bg-white text-[#17395c] font-bold hover:bg-[#f4df17] transition-colors
      "
              >
                <Download size={18} /> Download
              </a>
            </div >
          )
        }

      </div >
    </div>
  );
};

export default PostersAdvertisements;