"use client";

import { useState } from "react";

// ✅ Correct imports - make sure these files exist
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

  const selectedCountryData = countries.find(
    (c) => c.value === selectedCountry
  );


  // Country component mapping
  const countryComponentMap: Record<string, React.ReactNode> = {
    bahrain: <BahrainForm country={selectedCountryData} />,
    kuwait: <KuwaitForm country={selectedCountryData} />,
    uae: <UAEForm countries={countries} />,
    saudi: <SaudiForm country={selectedCountryData} />,
    qatar: <QatarForm country={selectedCountryData} />,
    oman: <OmanForm country={selectedCountryData} />,
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8eef5] to-[#f5f0d0] flex items-center justify-center p-4 md:p-10">
      {/* Dynamic width based on selection */}
      <div className={`w-full mx-auto transition-all duration-500 ${selectedCountry ? 'max-w-300' : 'max-w-145'
        }`}>

        {!selectedCountry && (
          <div
            className="relative rounded-[28px] mb-10"
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow:
                "0 32px 64px rgba(23,57,92,0.13), 0 8px 24px rgba(23,57,92,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Animated gradient top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.75"
              style={{
                background:
                  "linear-gradient(90deg, #17395c, #2a6099, #f4df17, #e8b800, #17395c, #2a6099)",
                backgroundSize: "300% 100%",
                animation: "gradBar 4s ease infinite",
              }}
            />

            {/* Ambient orbs */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 220,
                height: 220,
                right: -70,
                top: -70,
                background:
                  "radial-gradient(circle, rgba(244,223,23,0.18) 0%, transparent 70%)",
                zIndex: 0,
                animation: "orb1 7s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 180,
                height: 180,
                left: -50,
                bottom: -50,
                background:
                  "radial-gradient(circle, rgba(23,57,92,0.11) 0%, transparent 70%)",
                zIndex: 0,
                animation: "orb2 9s ease-in-out infinite",
              }}
            />

            <div className="relative z-10 p-10">
              {/* Logo circle */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-18 h-18 rounded-full flex items-center justify-center font-black text-white text-xl tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #17395c, #2a6099)",
                    boxShadow: "0 8px 24px rgba(23,57,92,0.3)",
                    animation: "float 4s ease-in-out infinite",
                  }}
                >
                  <Image
                    width={80}
                    height={80}
                    src="/gcc/logo-latest.png"
                    alt="VVM Logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-center text-[1.65rem] font-black tracking-tight mb-1"
                style={{
                  background: "linear-gradient(135deg, #17395c 30%, #2a6099 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Student Registration
              </h2>
              <p className="text-center text-[0.82rem] text-[#7a8fa6] tracking-wide mb-7">
                Select your country to get started
              </p>

              {/* Divider */}
              <div
                className="mb-7 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(23,57,92,0.15), transparent)",
                }}
              />

              {/* Select */}
              <div
                className="bg-white/30 rounded-2xl p-5 border border-white/50"
                style={{ boxShadow: "inset 0 1px 3px rgba(23,57,92,0.06)" }}
              >
                <label className="block text-[0.75rem] font-semibold uppercase tracking-widest text-[#4f6480] mb-2">
                  Country
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full border-[1.5px] border-[rgba(23,57,92,0.18)] rounded-[14px] px-4 py-3 text-[0.95rem] font-medium text-[#17395c] bg-white/80 cursor-pointer pr-10 appearance-none hover:border-[rgba(23,57,92,0.4)] hover:bg-white/95 focus:border-[#17395c] focus:outline-none focus:shadow-[0_0_0_3px_rgba(23,57,92,0.1)] transition-all"
                  >
                    <option value="">— Select country —</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom chevron */}
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 4l4 4 4-4"
                        stroke="#17395c"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Country pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {["UAE", "Saudi Arabia", "Kuwait", "Bahrain", "Qatar", "Oman"].map(
                  (pill) => (
                    <span
                      key={pill}
                      className="px-3 py-1 rounded-full text-[0.72rem] font-extrabold text-[#03408f] tracking-wide transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                      style={{
                        background: "rgba(23,57,92,0.06)",
                        border: "1px solid rgba(23,57,92,0.1)",
                      }}
                    >
                      {pill}
                    </span>
                  )
                )}
              </div>

              {/* Step dots */}
              <div className="flex justify-center gap-2 mt-6">
                <div
                  className="h-1.5 w-5.5 rounded-sm"
                  style={{ background: "linear-gradient(90deg,#17395c,#2a6099)" }}
                />
                <div className="h-1.5 w-1.5 rounded-full bg-[rgba(23,57,92,0.15)]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[rgba(23,57,92,0.15)]" />
              </div>
            </div>
          </div>
        )}

        {selectedCountry && (
          <div
            className="relative rounded-[28px] overflow-hidden mb-10"
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(255,255,255,0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow:
                "0 32px 64px rgba(23,57,92,0.13), 0 8px 24px rgba(23,57,92,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.75"
              style={{
                background:
                  "linear-gradient(90deg, #17395c, #2a6099, #f4df17, #e8b800, #17395c, #2a6099)",
                backgroundSize: "300% 100%",
                animation: "gradBar 4s ease infinite",
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 220,
                height: 220,
                right: -70,
                top: -70,
                background:
                  "radial-gradient(circle, rgba(244,223,23,0.18) 0%, transparent 70%)",
                zIndex: 0,
                animation: "orb1 7s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 180,
                height: 180,
                left: -50,
                bottom: -50,
                background:
                  "radial-gradient(circle, rgba(23,57,92,0.11) 0%, transparent 70%)",
                zIndex: 0,
                animation: "orb2 9s ease-in-out infinite",
              }}
            />

            <div className="relative z-10 p-8">
              {/* Back button */}
              <button
                onClick={() => setSelectedCountry("")}
                className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.8rem] font-semibold text-[#4f6480] border border-[rgba(23,57,92,0.15)] bg-white/60 hover:text-[#17395c] hover:bg-white/90 hover:border-[rgba(23,57,92,0.3)] transition-all duration-200 hover:-translate-x-0.5"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-0.75">
                  ←
                </span>
                Change Country
              </button>

              {/* Step dots — step 2 */}
              <div className="flex justify-center gap-2 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-[rgba(23,57,92,0.15)]" />
                <div
                  className="h-1.5 w-5.5 rounded-sm"
                  style={{ background: "linear-gradient(90deg,#17395c,#2a6099)" }}
                />
                <div className="h-1.5 w-1.5 rounded-full bg-[rgba(23,57,92,0.15)]" />
              </div>

              {countryComponentMap[selectedCountry]}
            </div>
          </div>
        )}
      </div>

      {/* Add global styles for animations */}
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
        .reg-card {
          animation: fadeSlideUp 0.5s cubic-bezier(0.34, 1.26, 0.64, 1) both;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s ease;
        }
        .reg-card:hover {
          transform: translateY(-5px) scale(1.003);
          box-shadow: 0 44px 88px rgba(23, 57, 92, 0.18),
                      0 12px 32px rgba(23, 57, 92, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
        }
      `}</style>
    </div>
  );
}