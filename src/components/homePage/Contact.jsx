"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { Contact } from "lucide-react";
import ContactsPage from "../../components/contactUs/countrycordinator";
export default function VVMContactSection() {
  return (
    <div className="relative py-10 sm:py-12 overflow-hidden bg-[linear-gradient(135deg,#edf2f7_0%,#e2e9f2_45%,#f7f9fc_100%)]">

      {/* Background Shapes */}
      <div className="absolute w-65 h-65 bg-[#f4df17]/30 rounded-full blur-[70px] opacity-40 top-10 -left-15 animate-[floatGlow_8s_ease-in-out_infinite]" />
      <div className="absolute w-[320px] h-80 bg-[#17395c]/20 rounded-full blur-[70px] opacity-40 -bottom-12.5 right-22.5 animate-[floatGlow_10s_ease-in-out_infinite]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#17395c_1px,transparent_1px)] bg-[length:28px_28px] [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />

      <div className="max-w-6xl mx-auto px-4 relative">

        {/* Top Section */}
        <div className="grid lg:grid-cols-2 items-center mb-12 gap-6">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-[#17395c] to-[#244d79] text-[#f4df17] text-[13px] font-extrabold tracking-[3px] uppercase shadow-lg mb-4">
              VVM SIF 2026-27
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.3rem)] font-extrabold text-[#17395c] mb-3 leading-tight">
              Contact & Outreach Desk
            </h2>
            <p className="max-w-155 text-[#5d7087] text-[1.06rem] leading-[1.9]">
              Contact the SPC team for registration, coordination, and outreach support.
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center animate-[floatSoft_5s_ease-in-out_infinite]">
              <div className="absolute inset-0 rounded-full p-2 bg-[linear-gradient(135deg,#f4df17,#17395c)] shadow-[0_0_0_10px_rgba(244,223,23,0.1),0_25px_60px_rgba(23,57,92,0.22)]" />
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
        <ContactsPage fullWidth={true} />
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