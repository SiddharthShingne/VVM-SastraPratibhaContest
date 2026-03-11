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
    <div className="min-h-screen bg-gray-50 py-10">

      <div className="w-[92%] lg:w-[80%] mx-auto">

        {!selectedCountry && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">

            <img
              src="/nav-logo.png"
              alt="VVM Logo"
              className="mx-auto mb-4 h-14"
            />

            <h2 className="text-xl font-semibold mb-4">
              Student Registration
            </h2>

            <div className="bg-gray-100 rounded-md p-4 max-w-sm mx-auto">
              <label className="block text-sm font-medium mb-2">
                Select Country
              </label>

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {selectedCountry && (
          <div className="bg-white rounded-lg shadow-md p-6">

            <button
              onClick={() => setSelectedCountry("")}
              className="mb-4 text-sm text-indigo-600 hover:underline"
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