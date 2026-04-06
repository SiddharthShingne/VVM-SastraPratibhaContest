
"use client";
import React from "react";

const VVMHeroAbout = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-[70px] pb-[95px] bg-gradient-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc]">

        {/* Background Effects */}
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#17395c_1px,transparent_1px)] [background-size:26px_26px]" />

        <div className="absolute w-[280px] h-[280px] bg-yellow-300/30 blur-[70px] rounded-full top-[15px] -left-[70px] animate-pulse" />
        <div className="absolute w-[340px] h-[340px] bg-blue-900/20 blur-[70px] rounded-full bottom-[-90px] -right-[-90px] animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">

          {/* TOP BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">

            <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#17395c] to-[#244d79] text-white shadow-lg border border-white/40 hover:scale-[1.02] transition">
              <span className="px-3 py-1 bg-yellow-400 text-[#17395c] rounded-full text-xs font-bold">Registration</span>
              <span className="font-semibold">VVM 2026-27</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#17395c] to-[#244d79] text-white shadow-lg border border-white/40">
              <span className="px-3 py-1 bg-yellow-400 text-[#17395c] rounded-full text-xs font-bold">Archive</span>
              <span className="font-semibold">Visit 2025-26</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#17395c] to-[#244d79] text-white shadow-lg border border-white/40">
              <span className="px-3 py-1 bg-yellow-400 text-[#17395c] rounded-full text-xs font-bold">Latest</span>
              <span className="font-semibold">SLC Result Updates</span>
            </a>

          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div className="text-center lg:text-left">

              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white shadow rounded-full">
                🏆 <span className="font-semibold">VVM 2026-27</span>
              </div>

              <p className="uppercase tracking-widest text-yellow-600 font-bold text-xs mb-2">
                National Science Talent Journey
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold text-[#17395c] mb-4">
                Vidyarthi Vigyan Manthan
              </h1>

              <p className="text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                A digital-based and one of the largest science talent search examinations
                designed for Emerging India, encouraging students to explore the scientific spirit.
              </p>

              {/* FEATURES */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                <div className="px-4 py-2 bg-white rounded-full shadow text-sm font-semibold">💻 Digital Exam</div>
                <div className="px-4 py-2 bg-white rounded-full shadow text-sm font-semibold">🏆 Recognition</div>
                <div className="px-4 py-2 bg-white rounded-full shadow text-sm font-semibold">📘 Learning</div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex justify-center">

              {/* Slider Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl w-full max-w-md">

                <div className="flex gap-2 mb-4">
                  <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                </div>

                <div className="bg-gradient-to-br from-[#eef3f8] to-[#f8fafc] p-6 rounded-2xl">
                  <span className="px-3 py-1 bg-yellow-400 text-xs font-bold rounded-full inline-block mb-3">
                    Internship
                  </span>

                  <h4 className="text-lg font-bold text-[#17395c] mb-2">
                    Srijan Internship VVM 2025-26
                  </h4>

                  <p className="text-sm text-gray-600">
                    Date & venue will be announced soon. Stay connected for updates.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                About VVM
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-[#17395c]">
                Know About Us
              </h2>

              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                A Digital Based Largest Science Talent Search Examination
              </h4>

              <p className="text-gray-600 leading-relaxed mb-6">
                Vidyarthi Vigyan Manthan (VVM) is a national program by
                <strong> VIBHA</strong> in collaboration with <strong>NCERT</strong> and <strong>NCSM</strong>.
                It aims to popularize science among students.
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="p-4 bg-gray-50 rounded-xl shadow">
                <h5 className="font-bold text-lg text-[#17395c]">267853</h5>
                <span className="text-sm text-gray-500">Students</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl shadow">
                <h5 className="font-bold text-lg text-[#17395c]">6832</h5>
                <span className="text-sm text-gray-500">Schools</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl shadow">
                <h5 className="font-bold text-lg text-[#17395c]">14</h5>
                <span className="text-sm text-gray-500">Languages</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl shadow">
                <h5 className="font-bold text-lg text-[#17395c]">204821</h5>
                <span className="text-sm text-gray-500">Level 1</span>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default VVMHeroAbout;