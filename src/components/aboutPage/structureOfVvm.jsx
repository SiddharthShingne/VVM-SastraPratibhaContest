"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const methods = [
    {
        title: "Objective Type Multiple Choice Questions",
        image: "about_first.png",
    },
    { title: "Comprehensive Writing", image: "about_second.png" },
    { title: "Presentation and Group Discussion", image: "about_third.png" },
    { title: "Role Play", image: "about_fourth.png" },
    { title: "Practical Examination", image: "about_fifth.png" },
    { title: "Methods Of Science", image: "about_sixth.png" },];
const WhatIsVVM = () => {
    return (
        <div className="font-open">
            {/* Hero Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-26 text-center">
                <h1 className="text-5xl md:text-5xl font-extrabold text-[#111d35] mb-4">
                    Structure Of VVM
                </h1>
                <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>About</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">Structure Of VVM</span>
                </div>
            </div>
            {/* Learning Methods Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-2 max-w-6xl">
                    <h1 className="text-3xl md:text-3xl text-center font-extrabold text-[#111d35] mb-4">STRUCTURE OF VIDYARTHI VIGYAN MANTHAN</h1>
                    <p className=" text-gray-800  py-7 px-4 mt-4 mb-2  text-sm sm:text-base leading-relaxed font-medium text-center ">Students participating in VVM shall undergo the following multi-level testing procedures:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {methods.map((method, index) => (
                            <div
                                key={index}
                                className="col-span-1 animate-slide-up duration-700 delay-100"
                            >
                                <div className="text-center p-4 sm:p-5 rounded-lg bg-white hover:shadow-[-4px_0_8px_-2px_gray] transition-shadow duration-300 max-w-70 mx-auto">
                                    <div className="mb-2 flex justify-center">
                                        <Image
                                            src={`/${method.image}`}
                                            alt={method.title}
                                            width={140}
                                            height={80}
                                            className="object-contain mx-auto"
                                        />
                                    </div>
                                    <h5 className="text-sm font-medium leading-snug">
                                        {method.title}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WhatIsVVM;
