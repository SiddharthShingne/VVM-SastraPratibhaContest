
"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const NationalCamp = () => {
  return (
    <div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Glass Card */}
        <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

          {/* Top Gradient Border */}
          <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

          <div className="p-8 text-left space-y-6 leading-relaxed">

            {/* Title */}
            <h2 className="text-[32px] font-black text-[#17395c] text-center">
              National Camp (NC)
            </h2>

            {/* Content */}
            <p className="text-[17px] text-[#4f6480] leading-[1.8]">
              Top two students from each class i.e. total 12 students from each
              state will be invited to a <strong>two-day National Camp</strong>.
              <br /><br />

              The <strong>National Camp (NC)</strong> will comprise of presentations
              and activities to test{" "}
              <strong>
                Scientific Understanding, Innovation, Creativity, Out-of-Box Thinking
              </strong>{" "}
              and <strong>Leadership Quality</strong>.
              <br /><br />

              Selected students will have to bear their{" "}
              <strong>travel expense</strong>.{" "}
              <strong>No travel support</strong> will be provided.
              <br />

              Organisers will arrange{" "}
              <strong>boarding and lodging</strong>.
              <br /><br />

              Details regarding venue will be shared by the respective state coordinators.
              <br /><br />

              <strong>Marks Display</strong> – Students can check their marks on the dashboard
              after one week of result declaration.
              <br /><br />

              <strong>Tiebreaker</strong> – In case of a tie, students will appear for{" "}
              <strong>Viva-Voce</strong>. The highest scorer will be declared winner.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default NationalCamp;