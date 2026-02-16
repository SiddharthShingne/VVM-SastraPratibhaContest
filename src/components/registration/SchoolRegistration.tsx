"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
interface Step {
    title: string;
    desc: string;
    icon: string;
}
const steps: Step[] = [
    {
        title: "Enter Region and Board",
        desc: "Enter your location details and school board information.",
        icon: "/school-registration/university.svg",
    },
    {
        title: "Provide school details",
        desc: "Enter your school details and create your unique username and password.",
        icon: "/school-registration/school1.svg",
    },
    {
        title: "OTP Verification",
        desc: "Different OTPs will be sent on your email and mobile number to verify your contact details.",
        icon: "/school-registration/email_otp.svg",
    },
    {
        title: "Accepting Terms and conditions",
        desc: "Read conditions carefully and complete registration by accepting it.",
        icon: "/school-registration/confirmation.svg",
    }
];
const SchoolRegistration = () => {
    return (
        <div>
            {/* Banner Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-20 text-center">
                <h1 className="text-5xl md:text-4xl font-bold text-[#111d35] mb-4">
                    School Registration Instructions
                </h1>
                <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Registration</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className=" text-extralight "> School Registration Instructions</span>
                </div>
            </div>
            {/* Guide Section */}
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-open">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#2F57EF] m-6 text-center">
                        School Registration Guide
                    </h2>
                    <div className="mb-6">
                        <p className="text-gray-600 text-sm max-w-lg">
                            To register as student please follow the steps given below.
                        </p>
                        <Link href="/register">
                            <button className="mt-4 bg-linear-to-r from-[#2F57EF] to-[#AC65E8] hover:from-[#AC65E8] hover:to-[#4f46e5] text-white text-sm font-semibold px-6 py-2 rounded-lg shadow-md inline-flex items-center">
                                Go To  School Registration
                                <span className="ml-2 text-lg">→</span>
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Steps Cards */}
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
    )
}
export default SchoolRegistration;