
"use client";
import React from "react";
import Link from "next/link";

const ExamRequirements = () => {
  return (
    <div>

      {/* Breadcrumb */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">

            <h6 className="text-white text-[27px] font-medium mb-1">
              Exam Requirements
            </h6>

            <ol className="flex items-center text-white text-[12px] whitespace-nowrap">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li className="mx-2">{">"}</li>
              <li>
                <Link href="/exam-details" className="hover:underline">
                  Exam Details
                </Link>
              </li>
              <li className="mx-2">{">"}</li>
              <li>Exam Requirements</li>
            </ol>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 py-5">

          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8 space-y-6">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center">
                Devices and Internet Facility
              </h2>

              {/* Intro */}
              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                All students will appear for the examination using their own devices
                with internet connectivity from school or home. Ensure the app is updated,
                device is fully charged, and same device is used as mock test.
              </p>

              {/* Subtitle */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Exam Application (App) Download & Installation
              </h4>

              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                The Exam App will be available on the student dashboard after registration.
                Download based on your device OS and allow push notifications.
              </p>

              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                Students can test the app through mock exams.
              </p>

              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Notifications and Mock Tests
              </h4>

              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                Mock tests help students prepare better and build confidence.
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-[#17395c1a]" />

              {/* System Verification */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                System Verification
              </h4>

              <ul className="list-disc pl-5 space-y-2 text-[#4f6480] marker:text-[#17395c]">
                <li>Verification of login credentials</li>
                <li>Live photo matching</li>
                <li>Internet speed check</li>
                <li>App version verification</li>
                <li>Download encrypted question paper</li>
              </ul>

              <div className="h-[1px] bg-[#17395c1a]" />

              {/* Level I */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                School Level Online Examination : Level-I
              </h4>

              <p className="font-semibold text-[#4f6480]">Section-A</p>
              <ul className="list-disc pl-5 space-y-2 text-[#4f6480] marker:text-[#17395c]">
                <li>30 minutes – 40 questions</li>
                <li>One question at a time</li>
                <li>Review allowed</li>
              </ul>

              <p className="font-semibold text-[#4f6480] mt-4">Section-B</p>
              <ul className="list-disc pl-5 space-y-2 text-[#4f6480] marker:text-[#17395c]">
                <li>60 minutes – 60 questions</li>
                <li>Final submission after completion</li>
              </ul>

              <div className="h-[1px] bg-[#17395c1a]" />

              {/* Level II */}
              {/* <h4 className="text-[20px] font-extrabold text-[#17395c]">
                School Level Online Examination : Level-II
              </h4>

              <ul className="list-disc pl-5 space-y-2 text-[#4f6480] marker:text-[#17395c]">
                <li>Proctored exam</li>
                <li>PISA-based questions</li>
                <li>50 MCQs</li>
                <li>Negative marking: -0.5</li>
              </ul>

              <p className="font-semibold text-[#4f6480] mt-4">Section-A</p>
              <ul className="list-disc pl-5 space-y-2 text-[#4f6480]">
                <li>15 minutes – 15 questions</li>
              </ul>

              <p className="font-semibold text-[#4f6480] mt-4">Section-B</p>
              <ul className="list-disc pl-5 space-y-2 text-[#4f6480]">
                <li>30 minutes – 35 questions</li>
              </ul>

              <div className="h-[1px] bg-[#17395c1a]" /> */}

              {/* Submission */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Exam Submission Process
              </h4>

              <ul className="list-disc pl-5 space-y-2 text-[#4f6480]">
                <li>Click "Go to Exam"</li>
                <li>Read and accept instructions</li>
                <li>Submit using SUBMIT button</li>
                <li>Auto-save on connection failure</li>
                <li>Upload via App/File/Email</li>
              </ul>

              <div className="h-[1px] bg-[#17395c1a]" />

              {/* Unfair Means */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Unfair Means
              </h4>

              <ul className="list-disc pl-5 space-y-2 text-[#4f6480]">
                <li><strong>Invigilator Visit:</strong> Physical monitoring</li>
                <li><strong>Online Proctoring:</strong> Continuous monitoring</li>
              </ul>

              <p className="text-[#d13b2f] font-semibold text-sm">
                Schools and students must cooperate to ensure fairness.
              </p>

              <div className="h-[1px] bg-[#17395c1a]" />

              {/* Disputes */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Disputes
              </h4>

              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                Any dispute will be resolved by the VVM Core Committee and will be final.
              </p>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ExamRequirements;