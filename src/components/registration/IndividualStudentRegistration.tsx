"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

interface Step {
    title: string;
    desc: string;
    icon: string;
}

const steps: Step[] = [
    {
        title: "Student details",
        desc: "Enter basic details of student like name, date of birth and gender",
        icon: "/student-registration-images/student.svg",
    },
    {
        title: "Login details",
        desc: "Create password for your account. Your username will be generated automatically and details will be sent on email id after registration.",
        icon: "/student-registration-images/login_details.svg",
    },
    {
        title: "Regional details",
        desc: "Enter your location details.",
        icon: "/student-registration-images/regional_details.svg",
    },
    {
        title: "School details",
        desc: "Enter your school name, board, address and class/grade.",
        icon: "/student-registration-images/school1.svg",
    },
    {
        title: "Contact details",
        desc: "Enter your parent/guardian personal and contact information.",
        icon: "/student-registration-images/contact_details.svg",
    },
    {
        title: "OTP Verification",
        desc: "Different OTPs will be sent on your email and mobile number to verify your contact details.",
        icon: "/student-registration-images/email_otp.svg",
    },
    {
        title: "Terms,Conditions & policy",
        desc: "Read conditions carefully and accepting it to proceed for payment.",
        icon: "/student-registration-images/confirmation.svg",
    },
    {
        title: "Payment",
        desc: "You can make payment fees ₹ 200/- using debit card/credit card/internet banking/UPI.",
        icon: "/student-registration-images/payment.svg",
    },
];

const IndividualStudentRegistration = () => {
    return (
        <div>
            {/* Banner Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-20 text-center">
                <h1 className="text-5xl md:text-4xl font-bold text-[#111d35] mb-4">
                    Student Registration Instructions
                </h1>

                <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Registration</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className=" text-extralight ">Student Registration Instructions</span>
                </div>
            </div>

            {/* Guide Section */}
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-open">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#2F57EF] m-6 text-center">
                        Student Registration Guide
                    </h2>

                    <div className="mb-6">
                        <p className="text-gray-600 text-sm max-w-lg">
                            To register as student please follow the steps given below.
                        </p>

                        <Link href="/register">
                            <button className="mt-4 bg-linear-to-r from-[#2F57EF] to-[#8f16f2] hover:from-[#AC65E8] hover:to-[#4f46e5] text-white text-sm font-semibold px-6 py-2 rounded-lg shadow-md inline-flex items-center">
                                Go To Student Registration
                                <span className="ml-2 text-lg">→</span>
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
    
                {/* Steps Cards */}
                <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <h2 className="text-[#2F57EF] font-bold m-4">STEP {index + 1}</h2>

                            <div className="mb-4 mx-auto bg-[#f4f7ff] w-24 h-24 rounded-full flex items-center justify-center">
                                <Image
                                    src={step.icon}
                                    alt={step.title}
                                    width={50}
                                    height={50}
                                    className="object-contain"
                                />
                            </div>

                            <p className="font-semibold text-[#2F57EF]">{step.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndividualStudentRegistration;