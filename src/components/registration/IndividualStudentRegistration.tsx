
"use client";
import Link from "next/link";

export default function StudentRegistrationInstructions() {
  return (
    <div className="bg-[#f4f8fc]">

      {/* Breadcrumb */}
      <div className="bg-[#162a4a] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
            Student Registration Instructions
          </h1>

          <div className="text-white text-sm flex gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>&gt;</span>
            <span>Registration</span>
            <span>&gt;</span>
            <span className="font-semibold">
              Student Registration Instructions
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Notice Card */}
        <div className="bg-yellow-50 border border-yellow-200 shadow-lg rounded-2xl p-6 flex gap-4 mb-10">
          <div className="text-yellow-500 text-4xl">⚠️</div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Important Registration Notice
            </h2>

            <p className="text-gray-700 mb-3">
              If you are already registered as a student in the previous year
              2025-26, you can use your existing credentials to log in.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>✔ No need to register again</li>
              <li>✔ Simply log in and update your profile</li>
              <li>✔ Proceed with payment for 2026-27</li>
            </ul>

            <p className="mt-3 text-gray-600">
              Use your same Username & Password.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mb-10">
          <Link
            href="/register"
            className="bg-gradient-to-r from-[#102c48] to-[#1e4a74] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            Student Registration →
          </Link>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
                <img src={step.img} alt="" className="h-16" />
              </div>

              <span className="inline-block bg-yellow-100 text-yellow-600 text-xs font-bold px-3 py-1 rounded-full mb-2">
                Step {index + 1}
              </span>

              <h3 className="font-bold text-lg text-[#17395c] mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/register"
            className="bg-gradient-to-r from-[#102c48] to-[#1e4a74] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            Student Registration →
          </Link>
        </div>

      </div>
    </div>
  );
}


/* Steps Data */
const steps = [
  {
    title: "Fill Registration Form",
    desc: "Enter student details carefully and complete all required fields.",
    img: "/assets/images/student-registration-images/student.svg",
  },
  {
    title: "Login Details",
    desc: "Create a strong password with capital, small, number & special character.",
    img: "/assets/images/student-registration-images/login_details.svg",
  },
  {
    title: "Parent / Guardian Details",
    desc: "Enter details and verify OTP received on email.",
    img: "/assets/images/student-registration-images/login_details.svg",
  },
  {
    title: "School Details",
    desc: "Enter school name, board, address, state, district and PIN code.",
    img: "/assets/images/student-registration-images/school1.svg",
  },
  {
    title: "Submit Registration",
    desc: "Click submit and credentials will be sent to your email.",
    img: "/assets/images/student-registration-images/contact_details.svg",
  },
  {
    title: "Login to Your Account",
    desc: "Use credentials received on email to login.",
    img: "/assets/images/student-registration-images/email_otp.svg",
  },
  {
    title: "Update Profile",
    desc: "Verify mobile number and complete profile details.",
    img: "/assets/images/student-registration-images/confirmation.svg",
  },
  {
    title: "Payment",
    desc: "Choose payment option and complete process to access full dashboard.",
    img: "/assets/images/student-registration-images/noun_payment_1800088.svg",
  },
];