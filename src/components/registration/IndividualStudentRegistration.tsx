"use client";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";



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

          {/* ICON */}
          <div className="text-yellow-500">
            <AlertCircle size={40} />
          </div>


          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Important Registration Notice
            </h2>

            <p className="text-gray-700 mb-3">
              If you are already registered as a student in the previous year
              2025-26, you can use your existing credentials to log in.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                No need to register again
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Simply log in and update your profile
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Proceed with payment for 2026-27
              </li>
            </ul>

            <p className="mt-3 text-gray-600">
              Use your same Username & Password.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mb-10">
          <Link
            href="/Register"
            className="bg-linear-to-r from-[#102c48] to-[#1e4a74] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            Student Registration
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gray-50 shadow-inner">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 96px, 128px"
                />
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
            href="/Register"
            className="bg-linear-to-r from-[#102c48] to-[#1e4a74] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            Student Registration
            <ArrowRight size={18} />
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
    desc: "Enter student details carefully and ensure all required fields are completed..",
    img: "/student-registration-images/student.svg",
  },
  {
    title: "Login Details",
    desc: "Create password for your account.Your password must include: Capital letter, Small letter, Number, Special character. Enter the same password in Confirm Password.",
    img: "/student-registration-images/Login_details.svg",
  },
  {
    title: "Parent / Guardian Details",
    desc: "Enter Parent/Guardian Name, Mobile Number, Email ID. Click “Send OTP” and enter OTP received on email to “Verify OTP”.",
    img: "/student-registration-images/Login_details.svg",
  },
  {
    title: "School Details",
    desc: "Enter Your School Name, Select School Board, School Address, State, District, City and School PIN Code.",
    img: "/student-registration-images/school1.svg",
  },
  {
    title: "Submit Registration",
    desc: "Click on “Submit Registration” and your Registration will be completed. Login credentials will be sent to your registered email id.",
    img: "/student-registration-images/contact_details.svg",
  },
  {
    title: "Login to Your Account",
    desc: "Click on Login and Enter credentials received on your email and click on login.",
    img: "/student-registration-images/email_otp.svg",
  },
  {
    title: "Update Profile",
    desc: "After login, click on “Update Profile” button to Verify your mobile number (OTP verification) and update all required details.",
    img: "/student-registration-images/confirmation.svg",
  },
  {
    title: "Payment",
    desc: "Click on the Payment button and choose your preferred payment option (QR Code or Credit Card) and complete the payment process.After successful payment: You will get full access to your profile.",
    img: "/student-registration-images/payment.svg",
  },
];