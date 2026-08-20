
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

            <h6 className="text-white text-[27px] font-medium mb-1 md:pl-40">
              Exam Requirements
            </h6>

            <ol className="flex items-center text-white text-[12px] whitespace-nowrap md:pl-40">
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
      <div className="bg-white w-500px md:px-40 p-6">
        <div className=" py-5">

          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8 space-y-6">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center">
                Device and Internet Facility
              </h2>

              {/* Intro */}
              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                All students will appear for the examination using their own devices
                with internet connectivity. Ensure the app is updated,
                device is fully charged and the app is working properly.
              </p>
              {/* Subtitle */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Exam Application (App) Download & Installation
              </h4>

              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                Once the registration process is complete, the Exam App will be made available for download from the profile page of the student. <br />
                The App will be installed and will function properly only if it is downloaded according
                to the operating system of the desired device from the student&#39;s profile page. <br />
                The profile page will contain detailed instructions for App download and installation.
              </p>

              {/* <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                Students can test the app through mock exams.
              </p> */}

                          {/* Divider */}
              <div className="h-[1px] bg-[#17395c1a]" />

              {/* System Verification */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
              Exam Requirements
              </h4>

              <ul className="list-disc pl-5 space-y-2 text-[#4f6480] marker:text-[#17395c]">
                <li>Login credentials will be required</li>
                <li>Only paid students will be allowed to take the exam. </li>
              </ul>            
            </div>
          </div>

        </div>
      </div>
      <div className="bg-white ">
        <div className="max-w-5xl mx-auto px-4 py-5">

          <div className="relative rounded-[28px] overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)] mb-20">

            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8 space-y-6">

              {/* Title */}
              <h2 className="text-[32px] font-black text-[#17395c] text-center">
                Notifications and Mock Tests
              </h2>

                          <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Mock Tests
              </h4>

              <p className="text-[17px] text-[#4f6480] leading-[1.8]">
                To build the confidence of the students and to make the exam userfriendly, Mock Tests will be conducted regularly. <br />
                The registered students will get regular Notifications regarding the availability of Mock Tests. <br />
                On the specified date and time, the student can login into the Exam App and take the Mock Test. <br />
                Upon completion of the Mock Test, the students can view their results on the result page.
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-[#17395c1a]" />
            

          
              {/* Submission */}
              <h4 className="text-[20px] font-extrabold text-[#17395c]">
                Exam Submission Process
              </h4>

              <ul className="list-disc pl-5 space-y-2 text-[#4f6480]">
                <li>Click &#34;Go to Exam&#34;</li>
                <li>Read and accept instructions</li>
                <li>Submit using SUBMIT button</li>
                <li>Auto-save on connection failure</li>
                <li>Upload via App/File/Email</li>
              </ul>    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamRequirements;