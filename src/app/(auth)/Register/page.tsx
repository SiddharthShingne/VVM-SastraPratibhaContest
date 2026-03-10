"use client";

import { useState } from "react";

// ✅ Correct imports (must match exact file names)
import BahrainForm from "./_components/BahrainForm";
import KuwaitForm from "./_components/KuwaitForm";
import UAEForm from "./_components/UAEForm";
import SaudiForm from "./_components/SaudiForm";
import QatarForm from "./_components/QatarForm";
import OmanForm from "./_components/OmanForm";

export default function RegisterPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const countries = [
    { value: "bahrain", label: "Bahrain" },
    { value: "kuwait", label: "Kuwait" },
    { value: "uae", label: "UAE" },
    { value: "saudi", label: "Saudi Arabia" },
    { value: "qatar", label: "Qatar" },
    { value: "oman", label: "Oman" },
  ];

  // ✅ Cleaner than switch-case
  const countryComponentMap: Record<string, React.ReactNode> = {
    bahrain: <BahrainForm />,
    kuwait: <KuwaitForm />,
    uae: <UAEForm />,
    saudi: <SaudiForm />,
    qatar: <QatarForm />,
    oman: <OmanForm />,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3">
      <div className="w-full max-w-lg">

        {/* INTRO SECTION */}
        {!selectedCountry && (
          <div className="bg-white rounded-lg shadow-md p-4 text-center">

            {/* LOGO */}
            <img
              src="/images/icons/vvm_logo.jpeg"
              alt="VVM Logo"
              className="mx-auto mb-3 h-12"
            />

            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-3">
              Student Registration
            </h2>

            {/* COUNTRY SELECT CARD */}
            <div className="bg-gray-100 rounded-md p-3">
              <label className="block text-xs font-medium mb-0.5">
                Select Country
              </label>

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select --</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* 🔵 COUNTRY COMPONENT SECTION */}
        {selectedCountry && (
          <div className="bg-white rounded-lg shadow-md p-3">

            {/* Back Button */}
            <button
              onClick={() => setSelectedCountry("")}
              className="mb-1 text-xs text-indigo-600 hover:underline"
            >
              ← Change Country
            </button>

            {countryComponentMap[selectedCountry]}
          </div>
        )}

      </div>
    </div>
  );
}