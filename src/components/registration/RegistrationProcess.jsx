
"use client";
import Link from "next/link";

export default function RegistrationProcess() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#162a4a] py-[50px]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-[65px]">
            
            <h6 className="text-white text-[27px] font-medium mb-1">
              Registration Process
            </h6>

            <ol className="flex items-center text-white text-[12px] whitespace-nowrap">
              <li>
                <Link href="/" className="text-white hover:text-white">
                  Home
                </Link>
              </li>

              <li className="mx-2">{">"}</li>

              <li>
                <Link href="/registration" className="text-white">
                  Registration
                </Link>
              </li>

              <li className="mx-2">{">"}</li>

              <li className="text-white">
                Registration Process
              </li>
            </ol>

          </div>
        </div>
      </div>

      {/* Section */}
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 py-5">

          {/* Card */}
          <div className="bg-[rgba(255,255,255,0.74)] rounded-xl border border-gray-200">
            
            <div className="p-6 sm:p-8">

              {/* Title */}
              <h2 className="text-[26px] font-semibold text-[#17395c] mb-4">
                ALL ABOUT REGISTRATION AND EXAMINATION
              </h2>

              {/* Intro */}
              <p className="text-gray-700 text-[15px] leading-7 mb-4">
                <strong>Vidyarthi Vigyan Manthan</strong> is a national level,
                unique, App-based science talent search examination conducted online.
                Students can take the exam from their device (mobile, laptop, or desktop)
                from home. The exam is available on Windows and Android platforms only,
                and the timing will be the same across India.
              </p>

              <div className="border-t my-4"></div>

              <p className="text-gray-700 text-[15px] mb-4">
                <strong>The mode of registration will also be online.</strong>
              </p>

              {/* A */}
              <h4 className="text-[18px] font-semibold text-[#17395c] mb-2">
                (A) INDIVIDUAL STUDENT REGISTRATION:
              </h4>

              <ul className="list-disc pl-5 text-gray-700 text-[14px] space-y-2 mb-4">
                <li>We are open for individual registration.</li>
                <li>
                  Students must enter details like Name, DoB, Password, Class,
                  School, Address, etc. Verification is done via OTP on mobile and email.
                </li>
                <li>
                  Students must pay <strong>Rs. 200/-</strong> through online payment.
                  <span className="text-gray-500 text-[13px]">
                    {" "}* Applicable only for students studying in India.
                  </span>
                </li>
                <li>
                  After registration, students receive a unique username and encrypted password.
                </li>
                <li>
                  Evaluation is based on school district and registration details.
                </li>
              </ul>

              <div className="border-t my-4"></div>

              {/* B */}
              <h4 className="text-[18px] font-semibold text-[#17395c] mb-2">
                (B) SCHOOL/INSTITUTE REGISTRATION:
              </h4>

              <p className="text-gray-700 text-[14px] mb-3">
                Bulk registration is encouraged. Minimum 10 students per class required.
              </p>

              {/* Step I */}
              <h5 className="text-[15px] font-semibold text-[#17395c] mt-3 mb-1">
                STEP – I: Appointment of Coordinator
              </h5>
              <p className="text-gray-700 text-[14px] mb-2">
                The Principal appoints an Exam Coordinator responsible for registration.
              </p>

              {/* Step II */}
              <h5 className="text-[15px] font-semibold text-[#17395c] mt-3 mb-1">
                STEP – II: School Registration
              </h5>
              <ul className="list-disc pl-5 text-gray-700 text-[14px] space-y-2">
                <li>Enter school details, principal & coordinator info.</li>
                <li>Verification via OTP on mobile and email.</li>
                <li>Unique Referral Code generated after verification.</li>
              </ul>

              {/* Step III */}
              <h5 className="text-[15px] font-semibold text-[#17395c] mt-3 mb-1">
                STEP – III: Student Registration
              </h5>
              <ul className="list-disc pl-5 text-gray-700 text-[14px] space-y-2">
                <li>
                  Students register individually and pay <strong>Rs. 200/-</strong>
                  <span className="text-gray-500 text-[13px]">
                    {" "}* Applicable only for students in India.
                  </span>
                </li>
                <li>Students enter referral code to link with school.</li>
                <li>Coordinator can register students online or via Excel upload.</li>
                <li>Minimum 10 students required to enable payment.</li>
                <li>Payment can be online or offline (bank transfer).</li>
                <li>Login credentials shared after payment confirmation.</li>
              </ul>

              {/* Step IV */}
              <h5 className="text-[15px] font-semibold text-[#17395c] mt-3 mb-1">
                STEP – IV: Student Profile Creation
              </h5>
              <ul className="list-disc pl-5 text-gray-700 text-[14px] space-y-2">
                <li>Password change is mandatory on first login.</li>
                <li>Students must complete profile details.</li>
                <li>Exam date is pre-selected and cannot be changed.</li>
                <li>Students must check device compatibility beforehand.</li>
                <li>Coordinator can modify student details if needed.</li>
              </ul>

              <div className="border-t my-4"></div>

              {/* Fee */}
              <h4 className="text-[18px] font-semibold text-[#17395c] mb-2">
                FEE STRUCTURE:
              </h4>

              <ul className="list-disc pl-5 text-gray-700 text-[14px] space-y-2">
                <li>
                  Registration fee is <strong>Rs. 200/-</strong>
                  <span className="text-gray-500 text-[13px]">
                    {" "}* Applicable only for students in India.
                  </span>
                </li>
                <li>
                  Schools can retain <strong>Rs. 30/- per student</strong> as service charge.
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-gray-300" />
      </div>
    </div>
  );
}