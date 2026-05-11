"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { Contact } from "lucide-react";

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
        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-[28px] w-full p-4 sm:p-6 md:p-8 shadow-lg relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="absolute top-0 left-0 h-1.25 w-full bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

          {/* Main Heading */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14.5 h-14.5 rounded-[18px] bg-linear-to-br from-[#17395c] to-[#2b5d90] text-[#f4df17] flex items-center justify-center shadow-lg">
              <Contact size={25} className="text-white" />
            </div>
            <h3 className="text-[1.45rem] font-extrabold text-[#17395c]">
            Country Coordinators
            </h3>
          </div>

          {/* ========== UAE SECTION ========== */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <img src="/gcc/uae.png" alt="UAE" className="w-10 h-10 rounded-full object-cover border-2 border-[#17395c]" />
              <h4 className="text-xl font-extrabold text-[#17395c]">United Arab Emirates (UAE)</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">UAE Coordinator</h4>
                  <span className="text-[#b88d00] font-bold text-sm"> Coordinator - SPC</span>
                  <a href="tel:+971XXXXXXXX" className="text-[#17395c] font-semibold">📞 +971-XXXX-XXXX</a>
                  <a href="mailto:uae1@spc.org" className="text-[#17395c] font-semibold">✉️ uae1@spc.org</a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">UAE Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm"> Coordinator - SPC</span>
                  <a href="tel:+971XXXXXXXX" className="text-[#17395c] font-semibold">📞 +971-XXXX-XXXX</a>
                  <a href="mailto:uae2@spc.org" className="text-[#17395c] font-semibold">✉️ uae2@spc.org</a>
                </div>
              </div>
            </div>
          </div>

          {/* ========== OMAN SECTION ========== */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <img src="/gcc/oman.png" alt="Oman" className="w-10 h-10 rounded-full object-cover border-2 border-[#17395c]" />
              <h4 className="text-xl font-extrabold text-[#17395c]">Oman</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Oman Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+968XXXXXXXX" className="text-[#17395c] font-semibold">📞 +968-XXXX-XXXX</a>
                  <a href="mailto:oman1@spc.org" className="text-[#17395c] font-semibold">✉️ oman1@spc.org</a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Oman Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+968XXXXXXXX" className="text-[#17395c] font-semibold">📞 +968-XXXX-XXXX</a>
                  <a href="mailto:oman2@spc.org" className="text-[#17395c] font-semibold">✉️ oman2@spc.org</a>
                </div>
              </div>
            </div>
          </div>

          {/* ========== KUWAIT SECTION ========== */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <img src="/gcc/kuwait.png" alt="Kuwait" className="w-10 h-10 rounded-full object-cover border-2 border-[#17395c]" />
              <h4 className="text-xl font-extrabold text-[#17395c]">Kuwait</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Kuwait Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+965XXXXXXXX" className="text-[#17395c] font-semibold">📞 +965-XXXX-XXXX</a>
                  <a href="mailto:kuwait1@spc.org" className="text-[#17395c] font-semibold">✉️ kuwait1@spc.org</a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Kuwait Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+965XXXXXXXX" className="text-[#17395c] font-semibold">📞 +965-XXXX-XXXX</a>
                  <a href="mailto:kuwait2@spc.org" className="text-[#17395c] font-semibold">✉️ kuwait2@spc.org</a>
                </div>
              </div>
            </div>
          </div>

          {/* ========== QATAR SECTION ========== */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <img src="/gcc/qatar.png" alt="Qatar" className="w-10 h-10 rounded-full object-cover border-2 border-[#17395c]" />
              <h4 className="text-xl font-extrabold text-[#17395c]">Qatar</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Qatar Coordinator</h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+974XXXXXXXX" className="text-[#17395c] font-semibold">📞 +974-XXXX-XXXX</a>
                  <a href="mailto:qatar1@spc.org" className="text-[#17395c] font-semibold">✉️ qatar1@spc.org</a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Qatar Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+974XXXXXXXX" className="text-[#17395c] font-semibold">📞 +974-XXXX-XXXX</a>
                  <a href="mailto:qatar2@spc.org" className="text-[#17395c] font-semibold">✉️ qatar2@spc.org</a>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SAUDI ARABIA SECTION ========== */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <img src="/gcc/saudi-arab.png" alt="Saudi Arabia" className="w-10 h-10 rounded-full object-cover border-2 border-[#17395c]" />
              <h4 className="text-xl font-extrabold text-[#17395c]">Saudi Arabia</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Saudi Arabia Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+966XXXXXXXX" className="text-[#17395c] font-semibold">📞 +966-XXXX-XXXX</a>
                  <a href="mailto:saudi1@spc.org" className="text-[#17395c] font-semibold">✉️ saudi1@spc.org</a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Saudi Arabia Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+966XXXXXXXX" className="text-[#17395c] font-semibold">📞 +966-XXXX-XXXX</a>
                  <a href="mailto:saudi2@spc.org" className="text-[#17395c] font-semibold">✉️ saudi2@spc.org</a>
                </div>
              </div>
            </div>
          </div>

          {/* ========== BAHRAIN SECTION ========== */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <img src="/gcc/bahrain.png" alt="Bahrain" className="w-10 h-10 rounded-full object-cover border-2 border-[#17395c]" />
              <h4 className="text-xl font-extrabold text-[#17395c]">Bahrain</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Bahrain Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+973XXXXXXXX" className="text-[#17395c] font-semibold">📞 +973-XXXX-XXXX</a>
                  <a href="mailto:bahrain1@spc.org" className="text-[#17395c] font-semibold">✉️ bahrain1@spc.org</a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-white/95 border border-[#17395c]/10 rounded-3xl p-4 sm:p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-[#17395c] to-[#f4df17] mx-auto sm:mx-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-[#17395c]">Bahrain Coordinator </h4>
                  <span className="text-[#b88d00] font-bold text-sm">Coordinator - SPC</span>
                  <a href="tel:+973XXXXXXXX" className="text-[#17395c] font-semibold">📞 +973-XXXX-XXXX</a>
                  <a href="mailto:bahrain2@spc.org" className="text-[#17395c] font-semibold">✉️ bahrain2@spc.org</a>
                </div>
              </div>
            </div>
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