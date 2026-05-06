

"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { Contact, MapPin } from "lucide-react";
export default function VVMContactSection() {
  return (
    <div className="  relative py-10 sm:py-12 overflow-hidden bg-[linear-gradient(135deg,#edf2f7_0%,#e2e9f2_45%,#f7f9fc_100%)]">

      {/* Background Shapes */}
      <div className="absolute w-65 h-65#f4df17]/30 rounded-full blur-[70px] opacity-40 top-10 -left-15 animate-[floatGlow_8s_ease-in-out_infinite]" />
      <div className="absolute w-[320px] h-80 bg-[#17395c]/20 rounded-full blur-[70px] opacity-40 -bottom-12.5right-22.5 animate-[floatGlow_10s_ease-in-out_infinite]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#17395c_1px,transparent_1px)] bg-size-[28px_28px] mask-[linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />

      <div className="max-w-6xl mx-auto px-4 relative">

        {/* Top Section */}
        <div className="grid lg:grid-cols-2 items-center mb-12 gap-6">

          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-[#17395c] to-[#244d79] text-[#f4df17] text-[13px] font-extrabold tracking-[3px] uppercase shadow-lg mb-4">
              VVM  SIF 2026-27
            </span>

            <h2 className="text-[clamp(2rem,4vw,3.3rem)] font-extrabold text-[#17395c] mb-3 leading-tight">
              Contact & Outreach Desk
            </h2>

            <p className="max-w-155 text-[#5d7087] text-[1.06rem] leading-[1.9]">
              Connect with the VVM core team for registration, coordination, and national-level outreach support.
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center animate-[floatSoft_5s_ease-in-out_infinite]">

              <div className="absolute inset-0 rounded-full p-2 bg-[linear-gradient(135deg,#f4df17,#17395c)] shadow-[0_0_0_10px_rgba(244,223,23,0.1),0_25px_60px_rgba(23,57,92,0.22)]" />

              {/* <div className="absolute inset-[14px] rounded-full bg-gradient-to-br from-[#17395c] to-[#254e7a]" /> */}
              <div className="absolute inset-3.5 rounded-full bg-linear-to-br from-[#17395c] to-[#254e7a] flex items-center justify-center overflow-hidden"></div>
              <Image
                src="/gcc/Vidyarthi-Vigyan-Manthan-logo.png"
                alt="Logo"
                width={245}
                height={245}
                className="relative z-10 object-contain w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-[28px] w-full  p-4 sm:p-6 md:p-8 shadow-lg relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

          <div className="absolute top-0 left-0 h-1.25 w-full bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

          {/* Heading */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14.5 h-14.5 rounded-[18px] bg-linear-to-br from-[#17395c] to-[#2b5d90] text-[#f4df17] flex items-center justify-center shadow-lg">
              {/* <i className="feather-home text-[24px]" /> */}
              {/* <span className="text-yellow-400 text-2xl">🏢</span> */}
              <span className="text-yellow-400 text-2xl"> <Contact size={25} className="text-[white]" /></span>
            </div>
            <h3 className="text-[1.45rem] font-extrabold text-[#17395c]">
              Head Office Contacts
            </h3>
          </div>

          {/* Contacts Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Person Card */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">

              
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-extrabold text-[#17395c]">
                  Coordinator
                </h4>
                <span className="text-[#b88d00] font-bold text-sm">
                  Project Coordinator
                </span>



                <p className="text-[#4d6077] text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-[#17395c]" />
                  Vijnana Bharati (HQ), Delhi
                </p>
                <a href="tel:+911149032436" className="text-[#17395c] font-semibold">
                  📞 +91-11-49032436
                </a>
                <a href="mailto:raj@vvm.org.in" className="text-[#17395c] font-semibold">
                  ✉️ test@vvm.org.in
                </a>
              </div>
            </div>

            {/* Person 2 */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">

                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
                  </div>
                </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-extrabold text-[#17395c]">
                  Coordinator
                </h4>
                <span className="text-[#b88d00] font-bold text-sm">
                  Project Associate
                </span>


                <p className="text-[#4d6077] text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-[#17395c]" />
                  Vijnana Bharati (HQ), Delhi
                </p>

                <a href="tel:+911149032436" className="text-[#17395c] font-semibold">
                  📞 +91-11-49032436
                </a>
                <a href="mailto:praveen@vvm.org.in" className="text-[#17395c] font-semibold">
                  ✉️ test@vvm.org.in
                </a>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 bg-linear-to-r from-[#f4df17]/10 to-[#17395c]/10 p-5 rounded-xl border border-[#17395c]/10">

            {/* <div>
              <span className="text-xs font-extrabold tracking-widest text-[#b88d00] uppercase">
                Explore
              </span>
              <h5 className="font-extrabold text-[#17395c]">
                State Coordinator Directory
              </h5>
              <p className="text-sm text-[#5d7087]">
                Quick access to state-level coordination contacts.
              </p>
            </div> */}

            {/* <a
              href="/state-coordinators"
              className="px-5 py-3 rounded-full bg-linear-to-r from-[#17395c] to-[#244d79] text-[#f4df17] font-bold flex items-center gap-2 shadow-md hover:scale-105 transition"
            >
              State Coordinator →
            </a> 
          </div> */}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatGlow {
          0% { transform: translate(0,0); }
          50% { transform: translate(8px,-8px); }
          100% { transform: translate(0,0); }
        }
      `}</style>
    </div>
  );
}