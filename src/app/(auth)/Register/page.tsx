"use client";

import { useState } from "react";
import BahrainForm from "./_components/BahrainForm";
import KuwaitForm from "./_components/KuwaitForm";
import UAEForm from "./_components/UAEForm";
import SaudiForm from "./_components/SaudiForm";
import QatarForm from "./_components/QatarForm";
import OmanForm from "./_components/OmanForm";
import Image from "next/image";

export default function RegisterPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const countries = [
    { value: "bahrain", label: "Bahrain", code: "1" },
    { value: "kuwait", label: "Kuwait", code: "2" },
    { value: "uae", label: "UAE", code: "3" },
    { value: "saudi", label: "Saudi Arabia", code: "4" },
    { value: "qatar", label: "Qatar", code: "5" },
    { value: "oman", label: "Oman", code: "6" },
  ];

  // flagCards — sab contain
  const flagCards = [
    { name: "UAE", logo: "/gcc/uae.png", value: "uae", fit: "contain" },
    { name: "Saudi Arabia", logo: "/gcc/saudi-arab.png", value: "saudi", fit: "contain" },
    { name: "Kuwait", logo: "/gcc/kuwait.png", value: "kuwait", fit: "contain" },
    { name: "Bahrain", logo: "/gcc/bahrain.png", value: "bahrain", fit: "contain" },
    { name: "Qatar", logo: "/gcc/qatar.png", value: "qatar", fit: "contain" },
    { name: "Oman", logo: "/gcc/oman.png", value: "oman", fit: "contain" },
  ];

  const selectedCountryData = countries.find((c) => c.value === selectedCountry);

  const countryComponentMap: Record<string, React.ReactNode> = {
    bahrain: <BahrainForm country={selectedCountryData} />,
    kuwait: <KuwaitForm country={selectedCountryData} />,
    uae: <UAEForm countries={countries} />,
    saudi: <SaudiForm country={selectedCountryData} />,
    qatar: <QatarForm country={selectedCountryData} />,
    oman: <OmanForm country={selectedCountryData} />,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-10"
      style={{
        background: "linear-gradient(145deg, #dde8f5 0%, #eef3fa 40%, #f5f0d8 100%)",
      }}
    >
      <div className={`w-full mx-auto transition-all duration-500 ${selectedCountry ? "max-w-300" : "max-w-145"}`}>

        {!selectedCountry && (
          <div
            className="relative rounded-4xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 40px 80px rgba(23,57,92,0.14), 0 8px 24px rgba(23,57,92,0.08), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            {/* Animated top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, #17395c, #2a6099, #f4df17, #e8b800, #17395c, #2a6099)",
                backgroundSize: "300% 100%",
                animation: "gradBar 4s ease infinite",
              }}
            />

            {/* Ambient orbs */}
            <div className="absolute rounded-full pointer-events-none" style={{ width: 260, height: 260, right: -80, top: -80, background: "radial-gradient(circle, rgba(244,223,23,0.15) 0%, transparent 70%)", zIndex: 0, animation: "orb1 7s ease-in-out infinite" }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, left: -60, bottom: -60, background: "radial-gradient(circle, rgba(23,57,92,0.09) 0%, transparent 70%)", zIndex: 0, animation: "orb2 9s ease-in-out infinite" }} />

            <div className="relative z-10 p-10">

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full overflow-hidden"
                  style={{ boxShadow: "0 8px 28px rgba(23,57,92,0.25)", animation: "float 4s ease-in-out infinite" }}
                >
                  <Image width={80} height={80} src="/gcc/logo.png" alt="VVM Logo" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-center text-[1.75rem] font-black tracking-tight mb-1"
                style={{ background: "linear-gradient(135deg, #17395c 30%, #2a6099 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Student Registration
              </h2>
              <p className="text-center text-[0.82rem] text-[#7a8fa6] tracking-wide mb-7">
                Select your country to get started
              </p>

              {/* Divider */}
              <div className="mb-7 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(23,57,92,0.15), transparent)" }} />

              {/* Select dropdown */}
              <div className="rounded-2xl p-5 mb-6" >
                              <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full border-[1.5px] border-[rgba(23,57,92,0.18)] rounded-[14px] px-4 py-3 text-[0.95rem] font-medium text-[#17395c] bg-white cursor-pointer pr-10 appearance-none hover:border-[rgba(23,57,92,0.4)] focus:border-[#17395c] focus:outline-none focus:shadow-[0_0_0_3px_rgba(23,57,92,0.1)] transition-all"
                  >
                    <option value="">— Select country —</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.value}>{country.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="#17395c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* OR divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: "rgba(23,57,92,0.1)" }} />
                {/* <span className="text-[0.7rem] font-bold uppercase tracking-widest text-[#9aadbe]">or pick directly</span> */}
                <div className="flex-1 h-px" style={{ background: "rgba(23,57,92,0.1)" }} />
              </div>

              {/* Flag Cards */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {flagCards.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country.value)}
                    className="group flex flex-col items-center gap-2 py-3 px-2 rounded-2xl transition-all duration-250 cursor-pointer"
                    // style={{
                    //   background: "white",
                    //   border: "1.5px solid rgba(23,57,92,0.1)",
                    //   boxShadow: "0 2px 8px rgba(23,57,92,0.07)",
                    // }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.border = "1.5px solid rgba(23,57,92,0.35)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(23,57,92,0.14)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.border = "1.5px solid rgba(23,57,92,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(23,57,92,0.07)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* Flag image on pure white */}
                    <div
                      className="w-12 h-12 relative rounded-xl bg-white p-1"
                      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)" }}
                    >
                      <Image
                        src={country.logo}
                        alt={`${country.name} flag`}
                        fill
                        style={{ objectFit: "contain", padding: "4px" }}
                      />
                    </div>
                    <span
                      className="text-[0.6rem] font-bold tracking-wide text-center leading-tight"
                      style={{ color: "#2a4a6b" }}
                    >
                      {country.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step dots */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="h-1.5 w-6 rounded-full" style={{ background: "linear-gradient(90deg,#17395c,#2a6099)" }} />
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(23,57,92,0.15)" }} />
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(23,57,92,0.15)" }} />
              </div>
            </div>
          </div>
        )}

        {selectedCountry && (
          <div
            className="relative rounded-4xl overflow-hidden mb-10"
            style={{
              background: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(255,255,255,0.9)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 40px 80px rgba(23,57,92,0.14), 0 8px 24px rgba(23,57,92,0.08), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #17395c, #2a6099, #f4df17, #e8b800, #17395c, #2a6099)", backgroundSize: "300% 100%", animation: "gradBar 4s ease infinite" }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width: 220, height: 220, right: -70, top: -70, background: "radial-gradient(circle, rgba(244,223,23,0.18) 0%, transparent 70%)", zIndex: 0, animation: "orb1 7s ease-in-out infinite" }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width: 180, height: 180, left: -50, bottom: -50, background: "radial-gradient(circle, rgba(23,57,92,0.11) 0%, transparent 70%)", zIndex: 0, animation: "orb2 9s ease-in-out infinite" }} />

            <div className="relative z-10 p-8">
              <button
                onClick={() => setSelectedCountry("")}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.8rem] font-semibold text-[#4f6480] bg-white hover:text-[#17395c] hover:bg-white hover:shadow-md transition-all duration-200"
                style={{ border: "1.5px solid rgba(23,57,92,0.15)" }}
              >
                ← Change Country
              </button>

              <div className="flex justify-center gap-2 mb-6">
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(23,57,92,0.15)" }} />
                <div className="h-1.5 w-6 rounded-full" style={{ background: "linear-gradient(90deg,#17395c,#2a6099)" }} />
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(23,57,92,0.15)" }} />
              </div>

              {countryComponentMap[selectedCountry]}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradBar {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.15); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 18px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}