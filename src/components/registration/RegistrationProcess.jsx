"use client";
import Link from "next/link";

export default function RegistrationProcess() {
  return (
    <div className="page-bg">

      {/* ================= Breadcrumb ================= */}
      <div className="bg-[#162a4a] py-12.5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-16.25">

            <h6 className="text-white text-[27px] font-medium mb-1">
              Registration Process
            </h6>

            <ol className="flex text-white text-[12px] gap-2">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>{">"}</li>
              <li>
                <Link href="/registration" className="hover:underline">
                  Registration
                </Link>
              </li>
              <li>{">"}</li>
              <li className="font-semibold">Registration Process</li>
            </ol>

          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* 🔥 Glass Card */}
          <div className="relative glass-card overflow-hidden rounded-[28px] mb-16">

            {/* 🔥 Top Gradient Strip */}
            <div className="top-strip"></div>

            <div className="p-6 sm:p-10">

              {/* HEADER */}
              <div className="text-center mb-6">
                <span className="text-[18px] font-semibold text-gray-600">
                  Registration & Examination Guide
                </span>

                <h2 className="text-[32px] font-extrabold text-[#17395c] mt-2">
                  ALL ABOUT REGISTRATION
                </h2>
              </div>

              {/* INTRO */}
              <p className="text-[15px] text-[#4f6480] leading-7 mb-5">
                <strong>Vidyarthi Vigyan Manthan</strong> is a national-level,
                app-based science talent search examination conducted online.
                Students can take the exam from mobile, laptop, or desktop.
                The exam is available on Windows and Android platforms only.
              </p>

              <div className="h-px bg-[#17395c1a] my-6"></div>

              <p className="text-[15px] text-[#4f6480] mb-6">
                <strong>The mode of registration is completely online.</strong>
              </p>

              {/* ================= A ================= */}
              <h4 className="text-[20px] font-bold text-[#17395c] mb-3">
                (A) INDIVIDUAL STUDENT REGISTRATION
              </h4>

              <ul className="list-disc pl-5 text-[14px] text-[#4f6480] space-y-2 mb-6">
                <li>Open for individual registration.</li>
                <li>
                  Students must fill Name, DoB, Class, School, etc. with OTP verification.
                </li>
                <li>
                  Fee: <strong>Rs. 200/-</strong>{" "}
                  <span className="text-gray-500 text-[13px]">
                    (*Applicable in India only)
                  </span>
                </li>
                <li>Unique login credentials provided after registration.</li>
                <li>Evaluation is based on school and district data.</li>
              </ul>

              <div className="h-px bg-[#17395c1a] my-6"></div>

              {/* ================= B ================= */}
              <h4 className="text-[20px] font-bold text-[#17395c] mb-3">
                (B) SCHOOL / INSTITUTE REGISTRATION
              </h4>

              <p className="text-[14px] text-[#4f6480] mb-4">
                Bulk registration is encouraged (minimum 10 students per class).
              </p>

              {/* STEPS */}
              <div className="space-y-5">

                <div className="p-4 rounded-xl bg-[#17395c0d] border-l-4 border-[#f4df17]">
                  <h5 className="font-semibold text-[#17395c] mb-1">
                    STEP I: Appointment of Coordinator
                  </h5>
                  <p className="text-sm text-[#4f6480]">
                    Principal appoints an Exam Coordinator for managing registration.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#17395c0d] border-l-4 border-[#f4df17]">
                  <h5 className="font-semibold text-[#17395c] mb-1">
                    STEP II: School Registration
                  </h5>
                  <ul className="list-disc pl-5 text-sm text-[#4f6480]">
                    <li>Enter school & coordinator details</li>
                    <li>OTP verification</li>
                    <li>Referral Code generated</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#17395c0d] border-l-4 border-[#f4df17]">
                  <h5 className="font-semibold text-[#17395c] mb-1">
                    STEP III: Student Registration
                  </h5>
                  <ul className="list-disc pl-5 text-sm text-[#4f6480]">
                    <li>Students register & pay Rs. 200/-</li>
                    <li>Use referral code</li>
                    <li>Excel upload supported</li>
                    <li>Min 10 students required</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#17395c0d] border-l-4 border-[#f4df17]">
                  <h5 className="font-semibold text-[#17395c] mb-1">
                    STEP IV: Profile Creation
                  </h5>
                  <ul className="list-disc pl-5 text-sm text-[#4f6480]">
                    <li>Password reset mandatory</li>
                    <li>Complete profile</li>
                    <li>Check device compatibility</li>
                  </ul>
                </div>

              </div>

              <div className="h-px bg-[#17395c1a] my-6"></div>

              {/* ================= FEE ================= */}
              <h4 className="text-[20px] font-bold text-[#17395c] mb-3">
                FEE STRUCTURE
              </h4>

              <ul className="list-disc pl-5 text-[14px] text-[#4f6480] space-y-2">
                <li>
                  Registration fee: <strong>Rs. 200/-</strong>
                </li>
                <li>
                  Schools can retain <strong>Rs. 30/-</strong> per student.
                </li>
              </ul>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}