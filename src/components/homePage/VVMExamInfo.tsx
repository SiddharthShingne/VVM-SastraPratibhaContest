"use client";
import { useState } from "react";

type ImportantDateItem = {
  title: string;
  description: string;
};

type Props = {
  importantDates?: ImportantDateItem[];
};

export default function VVMExamInfo({ importantDates = [] }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="relative py-11.25 overflow-hidden 
      bg-[linear-gradient(135deg,#eef3f8_0%,#e5ecf4_45%,#f8fafc_100%)]">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.08] 
        bg-[radial-gradient(#17395c_1px,transparent_1px)] 
        bg-size-[26px_26px]" />

      {/* Glow Shapes */}
      <div className="absolute w-65 h-65 bg-yellow-300/20 blur-[70px] rounded-full top-5 -left-16 animate-pulse" />
      <div className="absolute w-80 h-80 bg-blue-900/20 blur-[70px] rounded-full -bottom-16 -right-20 animate-pulse" />

      <div className="max-w-6xl mx-auto px-4 relative">

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <span className="inline-block mb-4 px-5 py-2 rounded-full 
            bg-linear-to-r from-[#17395c] to-[#244d79] 
            text-yellow-300 text-xs font-extrabold tracking-widest uppercase">
            Important Information
          </span>

          <h3 className="text-4xl font-black text-[#17395c] mb-3">
            Important Information
          </h3>

          <p className="text-[#5d7087] leading-7">
            Check all key details related to important dates, registration process,
            syllabus, and student awards in one place.
          </p>
        </div>

        {/* Glass Card */}
        <div className="p-6 rounded-[30px] backdrop-blur-xl 
          bg-white/60 border border-white/60 
          shadow-[0_18px_40px_rgba(23,57,92,0.10)]">

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-sm font-bold transition 
                ${activeTab === "all"
                  ? "bg-linear-to-r from-[#17395c] to-[#244d79] text-yellow-300"
                  : "bg-white text-[#17395c] shadow-md hover:-translate-y-1"
                }`}
            >
              Important Dates
            </button>

            {/* <button
              onClick={() => setActiveTab("featured")}
              className={`px-5 py-2 rounded-full text-sm font-bold transition 
                ${activeTab === "featured"
                  ? "bg-gradient-to-r from-[#17395c] to-[#244d79] text-yellow-300"
                  : "bg-white text-[#17395c] shadow-md hover:-translate-y-1"
                }`}
            >
              Registration Process
            </button> */}
          </div>

          {/* ================= TAB CONTENT ================= */}

          {/* IMPORTANT DATES */}
          {activeTab === "all" && (
            <div className="rounded-2xl overflow-hidden border 
              bg-white shadow">

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-linear-to-r from-[#17395c] to-[#2c5c8c] text-white text-sm">
                    <th className="p-4">Event</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>

                <tbody className="text-center text-[#4f6480]">
                  {importantDates.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="py-6">
                        Coming Soon...
                      </td>
                    </tr>
                  ) : (
                    importantDates.map((item, index) => (
                      <tr key={index} className="even:bg-gray-50 hover:bg-blue-50">
                        <td
                          className="font-extrabold text-[#17395c] p-4"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <td
                          className="p-4 text-[17px]"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* REGISTRATION PROCESS */}
          {/* {activeTab === "featured" && (
            <div className="rounded-2xl overflow-hidden border bg-white shadow">

              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#17395c] to-[#2c5c8c] text-white">
                    <th className="p-4">Category</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>

                <tbody className="text-[#4f6480]">
                  <tr>
                    <td className="font-bold p-4">Eligibility</td>
                    <td className="p-4">
                      Students from Class VI to XI studying under CBSE, ICSE and State Boards
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="font-bold p-4">Exam Venue</td>
                    <td className="p-4">School / Home</td>
                  </tr>

                  <tr>
                    <td className="font-bold p-4">Registration</td>
                    <td className="p-4">
                      Opens on 1st July, 2025 <br />
                      Closes on 10th October, 2025
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="font-bold p-4">Fee</td>
                    <td className="p-4">₹200/-</td>
                  </tr>

                  <tr>
                    <td className="font-bold p-4">Website</td>
                    <td className="p-4">
                      <a
                        href="https://vvm.org.in"
                        target="_blank"
                        className="inline-flex px-4 py-2 rounded-full 
                        bg-gradient-to-r from-[#17395c] to-[#244d79] 
                        text-yellow-300 font-bold hover:-translate-y-1"
                      >
                        Visit Website
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          )} */}

        </div>
      </div>
    </section>
  );
}