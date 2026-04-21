
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Folder, UserPlus, Monitor, BookOpen } from 'lucide-react';

const VVMHeroAbout = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 bg-linear-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc]">

        {/* Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#17395c_1px,transparent_1px)] bg-size-[26px_26px]" />

        {/* Glow Shapes */}
        <div className="absolute w-70 h-70 bg-yellow-300/30 blur-[70px] rounded-full top-5 -left-16 animate-pulse"></div>
        <div className="absolute w-85 h-85 bg-blue-900/20 blur-[70px] rounded-full -bottom-20 -right-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">

          {/* TOP BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">

            <Link href="/Register" className="flex items-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-yellow-400 to-yellow-300 text-[#17395c] font-bold shadow-lg hover:scale-105 transition">
              <span className="bg-yellow-200 px-3 py-1 rounded-full text-xs font-extrabold">Registration</span>
              VVM 2026-27
              <UserPlus size={18} />
            </Link>

            <a href="https://archive-2526.vvmstage.cloud" className="flex items-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-[#102c48] to-[#1e4a74] text-white font-bold shadow-lg hover:scale-105 transition">
              <span className="bg-yellow-400 px-3 py-1 rounded-full text-xs font-extrabold text-[#17395c]">Archive</span>
              Visit VVM SIF Archive 2025-26
              <Folder size={18} />
            </a>

            {/* <Link href="/state-level-camp-exam" className="flex items-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-[#17395c] to-[#244d79] text-white font-bold shadow-lg hover:scale-105 transition">
              <span className="bg-yellow-400 px-3 py-1 rounded-full text-xs font-extrabold text-[#17395c]">Latest</span>
              SLC Result 2025-26
              <ArrowRight size={18} />
            </Link> */}

          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div className="space-y-6 text-center md:text-left">

              <div className="inline-block bg-white px-4 py-2 rounded-full shadow font-bold">
                🏆 VVM 2026-27
              </div>

              <span className="block text-yellow-700 uppercase text-xs font-extrabold tracking-widest">
                Science Talent Journey
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-[#17395c] leading-tight">
                Śāstra Pratibhā Contest
              </h1>

              <p className="text-gray-600 max-w-xl">
                A digital-based and one of the largest science talent search examination
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow font-semibold">
                  <Monitor size={16} /> Digital Exam Platform
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow font-semibold">
                  <BookOpen size={16} /> Learning + Competition
                </div>
              </div>

            </div>

            {/* RIGHT SLIDER CARD */}
            <div className="relative flex flex-col items-center gap-6">



              <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl max-w-md w-full">

                <div className="flex gap-2 mb-4">
                  <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                </div>

                <div className="space-y-4">

                  <div>
                    <span className="bg-yellow-300 px-3 py-1 rounded-full text-xs font-bold">Internship</span>
                    <h4 className="text-lg font-bold mt-2 text-[#17395c]">Srijan Internship VVM 2026-27</h4>
                    <p className="text-sm text-gray-600">Date & venue will be announced soon.</p>
                  </div>

                  <div>
                    <span className="bg-yellow-300 px-3 py-1 rounded-full text-xs font-bold">About VVM</span>
                    <h4 className="text-lg font-bold mt-2 text-[#17395c]">Largest Digital Science Talent Search</h4>
                    <p className="text-sm text-gray-600">Science exam for Emerging India.</p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 bg-linear-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <span className="text-yellow-600 font-bold uppercase text-sm">About VVM</span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#17395c] mt-3 mb-4">
              Know About Us
            </h2>

            <h4 className="font-bold text-lg mb-4">
              Largest Science Talent Search Examination
            </h4>

            <p className="text-gray-600 mb-6">
              VVM is a national program by <strong>VIBHA</strong> with NCERT & NCSM.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">

              {[
                ['267853', 'Students'],
                ['6832', 'Schools'],
                ['14', 'Indian Languages'],
                ['17261 ', 'SIF Students'],
                ['214', 'SIF Schools'],
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-blue-100 p-4 rounded-xl shadow border-2 border-[#17395c]">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                    ⭐
                  </div>
                  <div>
                    <h5 className="font-bold">{item[0]}</h5>
                    <span className="text-sm text-[#17395c]">{item[1]}</span>
                  </div>
                </div>
              ))}



            </div>
          </div>


          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative w-77.5 h-77.5 flex items-center justify-center  animate-[floatSoft_5s_ease-in-out_infinite] ">

              <div className="absolute inset-0 rounded-full p-2 bg-[linear-gradient(135deg,#f4df17,#17395c)] shadow-[0_0_0_10px_rgba(244,223,23,0.1),0_25px_60px_rgba(23,57,92,0.22)]" />

              <div className="absolute inset-3.5 rounded-full bg-linear-to-br from-[#17395c] to-[#254e7a] flex items-center justify-center overflow-hidden"></div>
              <Image
                src="/gcc/Vidyarthi-Vigyan-Manthan-logo.png"
                alt="Logo"
                width={245}
                height={245}
                className="relative z-10 object-contain w-57.5 h-57.5 rounded-full"
              />
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};

export default VVMHeroAbout;