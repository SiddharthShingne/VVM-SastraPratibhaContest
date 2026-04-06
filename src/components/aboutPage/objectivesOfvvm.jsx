
"use client";

import React from "react";
import {
  Lightbulb,
  Globe2,
  Wrench,
  ClipboardCheck,
  UserCheck,
  Award,
  Building,
  TrendingUp,
} from "lucide-react";

const ObjectivesOfVVM = () => {
  const methods = [
    {
      title: "To create among students an interest in pure science",
      icon: <Lightbulb />,
    },
    {
      title:
        "To educate school children about India’s contributions to the world of science and technology, from traditional to modern age",
      icon: <Globe2 />,
    },
    {
      title:
        "To provide hands-on training to students through workshops and other events",
      icon: <Wrench />,
    },
    {
      title:
        "To conduct competitive exams to identify students who have a scientific bent of mind",
      icon: <ClipboardCheck />,
    },
    {
      title:
        "To provide mentors for preparing students to carry forward their education in the field of science",
      icon: <UserCheck />,
    },
    {
      title:
        "To identify successful students at the State and National levels and felicitate them",
      icon: <Award />,
    },
    {
      title:
        "To organize exposure visits for the winners to various R&D institutions in the country",
      icon: <Building />,
    },
    {
      title:
        "To identify and nurture scientific aptitude through its unique scholastic aptitude test",
      icon: <TrendingUp />,
    },
  ];

  return (
    <div className="font-open">

      {/* Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Title */}
          <h6 className="font-[Montserrat,sans-serif] text-[30px] my-9 font-extrabold uppercase tracking-[1.5px] text-[#1a1a2e] leading-[1.4] text-center">
            OBJECTIVES OF VIDYARTHI VIGYAN MANTHAN (VVM)
          </h6>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {methods.map((method, index) => (
              <div key={index} className="flex">

                <div className="
                  group relative w-full h-full flex flex-col justify-center items-center text-center
                  rounded-[22px] p-6
                  bg-white/70 backdrop-blur-xl border border-white/60
                  shadow-[0_18px_40px_rgba(23,57,92,0.10)]
                  transition-all duration-300
                  hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(23,57,92,0.18)]
                  overflow-hidden
                ">

                  {/* Top Gradient Border */}
                  <div className="absolute top-0 left-0 w-full h-[4px] 
                    bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                  {/* ICON BOX */}
                  <div className="
                    w-[70px] h-[70px] mb-4 rounded-[18px]
                    bg-gradient-to-br from-[#17395c] to-[#2b5c8a]
                    flex items-center justify-center
                    shadow-[0_10px_25px_rgba(23,57,92,0.25)]
                    group-hover:scale-110 transition flex-shrink-0
                  ">
                    <div className="text-[#f4df17] w-7 h-7 flex items-center justify-center">
                      {method.icon}
                    </div>
                  </div>

                  {/* TEXT */}
                  <h5 className="
                    text-[16px] font-semibold leading-[1.6]
                    text-[#17395c]
                  ">
                    {method.title}
                  </h5>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesOfVVM;