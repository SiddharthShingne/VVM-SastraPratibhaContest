
import React from "react";
import Link from "next/link";

const Disputes = () => {
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">
            
            <h6 className="text-white text-[27px] font-medium mb-1  pl-40 ">
              Disputes
            </h6>

            <nav>
              <ol className="flex items-center text-white text-[12px] whitespace-nowrap pl-40">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li className="mx-2">{">"}</li>

                <li>Exam Details</li>

                <li className="mx-2">{">"}</li>

                <li className="text-white">Disputes</li>
              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* Disputes Section */}
      <div className="bg-white py-16 w-500px p-40 p-6">
        <div className="container mx-auto px-4 py-5">

          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]"></div>

            <div className="p-8">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center mb-5">
                Disputes, If Any
              </h2>

              {/* Content */}
              <p className="text-[17px] leading-[1.8] text-[#4f6480] mt-2">
                In the event of any dispute, grievance, or RTI (Right to Information)
                complaint, the decision made by the Core Committee shall be final
                and binding.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Disputes;