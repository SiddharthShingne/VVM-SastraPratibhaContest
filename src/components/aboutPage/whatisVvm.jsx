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
const whatIsVvm = () => {
    return (
        <div className="font-open">
            {/* Hero Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-26 text-center">
                <h1 className="text-5xl md:text-5xl font-extrabold text-[#111d35] mb-4">
                    About VVM
                </h1>
                <div className="flex justify-center items-center space-x-1 text-lg md:text-sm font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>About</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">About VVM</span>
                </div>
            </div>
            {/* About Description */}
            <div className="bg-white mt-14 pb-15 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-5 sm:p-7 font-sans">
                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl px-8 py-5  font-bold sm:font-extrabold text-gray-900">
                                VIDYARTHI VIGYAN MANTHAN (VVM)
                            </h2>
                            <span className="inline-block bg-[#f9e2f2] text-[#ec5c74] font-extralight mt-4 px-4  py-1 rounded-full text-sm sm:text-base">
                                (A Digital Based and Largest Science Talent Search Examination
                                for Emerging India)
                            </span>
                            <p className=" text-gray-800 text-justify py-7 px-4 mt-4 mb-2  text-sm sm:text-base leading-relaxed font-bold ">
                                <strong className="font-semibold">
                                    Vidyarthi Vigyan Manthan (VVM)
                                </strong>{" "}
                                is an initiative of Vijnana Bharati (VIBHA), in collaboration
                                with the National Council of Educational Research and Training
                                (NCERT), an institution under the Ministry of Education,
                                Government of India and the National Council of Science Museums
                                (NCSM), an autonomous organisation under the Ministry of
                                Culture, Government of India. <br />
                                VVM is a national program for popularizing science among school
                                students of standard VI to XI, conceptualized with the intent of
                                identifying “ignited minds”, to use the words of Dr. APJ Kalam,
                                with a scientific aptitude from amongst the student community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Learning Methods Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-2 max-w-6xl">
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

export default whatIsVvm;
