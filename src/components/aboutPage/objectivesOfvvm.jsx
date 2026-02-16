"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";
const ObjectivesOfVVM = () => {
    const methods = [
        {
            title: "To create among students an interest in pure science",
        },
        {
            title:
                "To educate school children about India’s contributions to the world of science and technology, from traditional to modern age",
        },
        {
            title:
                "To provide hands-on training to students through workshops and other events",
        },
        {
            title:
                "To conduct competitive exams to identify students who have a scientific bent of mind",
        },
        {
            title:
                "To provide mentors for preparing students to carry forward their education in the field of science",
        },
        {
            title:
                "To identify successful students at the State and National levels and felicitate them",
        },
        {
            title:
                "To organize exposure visits for the winners to various R&D institutions in the country",
        },
        {
            title:
                "To identify and nurture scientific aptitude through its unique scholastic aptitude test",
        },
    ];
    return (
        <div>
            <div className="font-open">
                {/* Hero Header */}
                <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-26 text-center">
                    <h1 className="text-5xl md:text-5xl font-extrabold text-[#111d35] mb-4">
                        Objectives Of VVM
                    </h1>
                    <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <span>About</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[#111d35]">Objectives Of VVM</span>
                    </div>
                </div>
                {/* Learning Methods Section */}
                <div className="bg-gray-100 py-10">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {methods.map((method, index) => (
                                <div
                                    key={index}
                                    className="col-span-1 flex" // Outer container for flex
                                >
                                    <div className="text-center p-6 sm:p-7 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300 w-full h-full flex flex-col justify-center min-h-55">
                                        <h5 className="text-lg font-semibold leading-snug text-gray-600">
                                            {method.title}
                                        </h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ObjectivesOfVVM;
