

"use client";

import Image from "next/image";
import { Contact, MapPin } from "lucide-react";
export default function VVMContactSection() {
  return (
    <div className="  relative py-[45px] overflow-hidden bg-[linear-gradient(135deg,#edf2f7_0%,#e2e9f2_45%,#f7f9fc_100%)]">
      
      {/* Background Shapes */}
      <div className="absolute w-[260px] h-[260px] bg-[#f4df17]/30 rounded-full blur-[70px] opacity-40 top-[40px] left-[-60px] animate-[floatGlow_8s_ease-in-out_infinite]" />
      <div className="absolute w-[320px] h-[320px] bg-[#17395c]/20 rounded-full blur-[70px] opacity-40 bottom-[-50px] right-[-90px] animate-[floatGlow_10s_ease-in-out_infinite]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#17395c_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />

      <div className="max-w-6xl mx-auto px-4 relative">
        
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 items-center mb-12 gap-6">
          
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#17395c] to-[#244d79] text-[#f4df17] text-[13px] font-extrabold tracking-[3px] uppercase shadow-lg mb-4">
              VVM 2026-27
            </span>

            <h2 className="text-[clamp(2rem,4vw,3.3rem)] font-extrabold text-[#17395c] mb-3 leading-tight">
              National Contact & Outreach Desk
            </h2>

            <p className="max-w-[620px] text-[#5d7087] text-[1.06rem] leading-[1.9]">
              Connect with the VVM core team for registration, coordination, and national-level outreach support.
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative w-[310px] h-[310px] flex items-center justify-center animate-[floatSoft_5s_ease-in-out_infinite]">
              
              <div className="absolute inset-0 rounded-full p-[8px] bg-[linear-gradient(135deg,#f4df17,#17395c)] shadow-[0_0_0_10px_rgba(244,223,23,0.1),0_25px_60px_rgba(23,57,92,0.22)]" />

              {/* <div className="absolute inset-[14px] rounded-full bg-gradient-to-br from-[#17395c] to-[#254e7a]" /> */}
<div className="absolute inset-[14px] rounded-full bg-gradient-to-br from-[#17395c] to-[#254e7a] flex items-center justify-center overflow-hidden"></div>
              <Image
                src="/gcc/Vidyarthi-Vigyan-Manthan-logo.png"
                alt="Logo"
                width={245} 
                height={245}
                className="relative z-10 object-contain w-[230px] h-[230px] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-[28px] w-full p-8 shadow-lg relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          
          <div className="absolute top-0 left-0 h-[5px] w-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

          {/* Heading */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[58px] h-[58px] rounded-[18px] bg-gradient-to-br from-[#17395c] to-[#2b5d90] text-[#f4df17] flex items-center justify-center shadow-lg">
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
            <div className="flex gap-4 bg-white/95 border border-[#17395c]/10 rounded-[24px] p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
              
              <div className="w-[150px] h-[150px] rounded-full p-[4px] bg-gradient-to-br from-[#17395c] to-[#f4df17] overflow-hidden">
                <Image
                  src="/head-office/raj.jpeg"
                  alt="Raj Kumar"
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-extrabold text-[#17395c]">
                  Sh. Raj Kumar
                </h4>
                <span className="text-[#b88d00] font-bold text-sm">
                  Project Coordinator - VVM
                </span>

             

                               <p className="text-[#4d6077] text-sm flex items-center gap-2">
  <MapPin size={16} className="text-[#17395c]" />
  Vijnana Bharati (HQ), Delhi
</p>
                <a href="tel:+911149032436" className="text-[#17395c] font-semibold">
                  📞 +91-11-49032436
                </a>
                <a href="mailto:raj@vvm.org.in" className="text-[#17395c] font-semibold">
                  ✉️ raj@vvm.org.in
                </a>
              </div>
            </div>

            {/* Person 2 */}
            <div className="flex gap-4 bg-white/95 border border-[#17395c]/10 rounded-[24px] p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
              
              <div className="w-[150px] h-[150px] rounded-full p-[4px] bg-gradient-to-br from-[#17395c] to-[#f4df17] overflow-hidden">
                <Image
                  src="/head-office/praveen.jpg"
                  alt="Praveen"
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-extrabold text-[#17395c]">
                  Sh. TV Praveen
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
                  ✉️ praveen@vvm.org.in
                </a>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 bg-gradient-to-r from-[#f4df17]/10 to-[#17395c]/10 p-5 rounded-xl border border-[#17395c]/10">
            
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#b88d00] uppercase">
                Explore
              </span>
              <h5 className="font-extrabold text-[#17395c]">
                State Coordinator Directory
              </h5>
              <p className="text-sm text-[#5d7087]">
                Quick access to state-level coordination contacts across India.
              </p>
            </div>

            <a
              href="/state-coordinators"
              className="px-5 py-3 rounded-full bg-gradient-to-r from-[#17395c] to-[#244d79] text-[#f4df17] font-bold flex items-center gap-2 shadow-md hover:scale-105 transition"
            >
              State Coordinator →
            </a>
          </div>
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