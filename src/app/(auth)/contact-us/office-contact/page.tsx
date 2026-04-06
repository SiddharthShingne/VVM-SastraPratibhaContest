
"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div>
      {/* ================= Breadcrumb ================= */}
      <div className="bg-[#162a4a] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">
            <h6 className="text-white text-[27px] font-medium mb-1">
              Contact Us
            </h6>

            <nav>
              <ol className="flex text-white text-xs space-x-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>{">"}</li>
                <li className="text-white">Contact Us</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* ================= Contact Cards ================= */}
      <div className="relative py-16 bg-gradient-to-br from-[#edf2f7] via-[#e8eef5] to-[#f7f9fc]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-6">
            
            {/* EMAIL */}
            <div className="w-full md:w-[48%] lg:w-[31%] flex">
              <div className="w-full rounded-[26px] bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#17395c] via-yellow-400 to-[#17395c]" />

                <div className="p-6 flex flex-col h-full">
                  
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#17395c] to-[#244d79] flex items-center justify-center shadow-lg">
                    <span className="text-yellow-400 text-2xl">📧</span>
                  </div>

                  <h4 className="text-xl font-bold text-[#17395c] text-center mb-4">
                    E-MAIL ID
                  </h4>

                  <div className="flex flex-col gap-3 flex-grow">
                    <div className="flex justify-between border-b pb-2 text-sm">
                      <span className="font-bold text-[#17395c]">Office</span>
                      <a
                        href="mailto:office@vvm.org.in"
                        className="font-semibold text-[#17395c] hover:text-yellow-600"
                      >
                        office@vvm.org.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SUPPORT */}
            <div className="w-full md:w-[48%] lg:w-[31%] flex">
              <div className="w-full rounded-[26px] bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#17395c] via-yellow-400 to-[#17395c]" />

                <div className="p-6 flex flex-col h-full">

                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#17395c] to-[#244d79] flex items-center justify-center shadow-lg">
                    <span className="text-yellow-400 text-2xl">🎧</span>
                  </div>

                  <h4 className="text-xl font-bold text-[#17395c] text-center mb-4">
                    SUPPORT
                  </h4>

                  <div className="flex flex-col gap-3 flex-grow">
                    <div className="flex justify-between border-b pb-2 text-sm">
                      <span className="font-bold text-[#17395c]">Mobile</span>
                      <a
                        href="https://wa.me/8767611690"
                        target="_blank"
                        className="font-semibold text-[#17395c] hover:text-yellow-600"
                      >
                        +91 8767611690
                      </a>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-[#17395c]">Mobile</span>
                      <a
                        href="https://wa.me/8329396612"
                        target="_blank"
                        className="font-semibold text-[#17395c] hover:text-yellow-600"
                      >
                        +91 8329396612
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="w-full lg:w-[31%] flex">
              <div className="w-full rounded-[26px] bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">

                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#17395c] via-yellow-400 to-[#17395c]" />

                <div className="p-6 flex flex-col items-center text-center h-full">

                  <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[#17395c] to-[#244d79] flex items-center justify-center shadow-lg">
                    <span className="text-yellow-400 text-2xl">📍</span>
                  </div>

                  <h4 className="text-xl font-bold text-[#17395c] mb-4">
                    OUR LOCATION
                  </h4>

                  <p className="text-sm leading-7 text-[#4f6480]">
                    VVM Secretariat,<br />
                    Vijnana Bharati (VIBHA),<br />
                    D-12, South Extension-I,<br />
                    New Delhi - 110049
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= Google Map ================= */}
      <div className="bg-white pt-12">
        <iframe
          className="w-full h-[600px] border-0"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7008.815977880848!2d77.212586!3d28.557509!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26b9e4b6b03%3A0xa250e95f2101e485!2sGulmohar%20Park%2C%20New%20Delhi%2C%20Delhi%20110049!5e0!3m2!1sen!2sin!4v1743432244533!5m2!1sen!2sin"
          loading="lazy"
        />
      </div>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="my-8" />
      </div>
    </div>
  );
}