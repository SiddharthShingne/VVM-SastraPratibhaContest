"use client";
import { useState } from "react";

export default function IndividualStudentRegistrationForm() {
  const [openSection, setOpenSection] = useState({
    primary: true,
    parent: true,
    school: true,
    terms: true,
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#162a4a] py-12 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-medium">Register</h2>
          <div className="text-sm mt-1">
            Home {'>'} Register {'>'} Student Registration
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Section Card */}
        {[
          { key: "primary", title: "Primary Details" },
          { key: "parent", title: "Parent / Guardian Details" },
          { key: "school", title: "School Details" },
          { key: "terms", title: "Terms & Conditions" },
        ].map((section) => (
          <div key={section.key} className="bg-white rounded-2xl shadow-md p-6">

            {/* Header */}
            <div className="flex justify-between items-center bg-[#336292] text-white px-5 py-3 rounded-xl mb-6">
              <h3 className="font-semibold">{section.title}</h3>
              <button
                onClick={() => toggleSection(section.key)}
                className="bg-white text-[#336292] w-8 h-8 rounded-md"
              >
                {openSection[section.key] ? "−" : "+"}
              </button>
            </div>

            {/* Content */}
            {openSection[section.key] && (
              <div className="grid md:grid-cols-3 gap-4">

                {section.key === "primary" && (
                  <>
                    <input placeholder="Full Name" className="input" />
                    <input type="date" className="input" />
                    <select className="input">
                      <option>Gender</option>
                    </select>
                    <input placeholder="Standard" className="input" />
                    <input type="password" placeholder="Password" className="input" />
                    <input type="password" placeholder="Confirm Password" className="input" />
                  </>
                )}

                {section.key === "parent" && (
                  <>
                    <input placeholder="Parent Name" className="input" />
                    <input placeholder="Mobile" className="input" />
                    <input placeholder="Email" className="input" />
                    <input placeholder="OTP" className="input" />
                  </>
                )}

                {section.key === "school" && (
                  <>
                    <input placeholder="School Name" className="input col-span-3" />
                    <input placeholder="Board" className="input" />
                    <input placeholder="Address" className="input" />
                    <input placeholder="State" className="input" />
                    <input placeholder="District" className="input" />
                    <input placeholder="City" className="input" />
                    <input placeholder="Pin Code" className="input" />
                  </>
                )}

                {section.key === "terms" && (
                  <div className="col-span-3">
                    <div className="h-48 overflow-y-auto border rounded-lg p-4 text-sm text-gray-600">
                      Terms & Conditions content...
                    </div>
                    <label className="flex items-center gap-2 mt-4">
                      <input type="checkbox" />
                      Accept Terms
                    </label>
                  </div>
                )}

              </div>
            )}
          </div>
        ))}

        {/* Submit */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-12 py-4 rounded-xl shadow-lg hover:scale-105 transition">
            Submit Registration
          </button>
        </div>
      </div>

      {/* Tailwind Input Style */}
      <style jsx>{`
        .input {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
        }
        .input:focus {
          outline: none;
          border-color: #4a7ba7;
          box-shadow: 0 0 0 3px rgba(74, 123, 167, 0.2);
          background: #fff;
        }
      `}</style>
    </div>
  );
}
