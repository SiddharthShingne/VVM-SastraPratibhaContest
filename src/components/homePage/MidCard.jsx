"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MidCard = () => {
    const [showFront, setShowFront] = useState(true);

    const toggleCard = () => {
        setShowFront((prev) => !prev);
    };

    return (
        <div
            className="bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-3 gap-4"
            style={{ backgroundImage: "url('/home/bg-midcard.webp')" }}
        >
            {/* LEFT SIDE */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 shadow-lg shadow-[#cbb8e9]/40 rounded-xl p-4">
                {/* Badge */}
                <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 w-fit text-base sm:text-lg font-bold border border-gray-100 shadow-[4px_4px_12px_rgba(127,0,255,0.3),-4px_-4px_12px_rgba(225,0,255,0.2)]">
                    <div className="bg-[#f5f0ff] p-2 rounded-md">
                        <Image src="/trophy.png" alt="Trophy" width={24} height={24} />
                    </div>
                    <span className="text-[#111d35] font-extrabold text-lg sm:text-xl">
                        VVM 2025–26
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111d35] leading-tight tracking-tight">
                    Welcome <br />
                    <span>Registration is live now</span>
                </h1>

                {/* Button */}
                <Link href="/contactus">
                    <button className="flex items-center gap-2 bg-linear-to-r from-[#7F00FF] to-[#E100FF] text-white font-semibold px-5 py-3 rounded-lg text-base sm:text-lg w-fit group transition-all duration-300 hover:shadow-md">
                        <span>Contact Us</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </Link>
            </div>

            {/* RIGHT SIDE – FLIP CARD */}
            <div className="relative w-full lg:w-[35%]">
                {/* Shadow layers */}
                <div className="absolute top-2 left-2 w-full h-60 sm:h-70 lg:h-75 bg-[#7F00FF] opacity-20 rounded-xl shadow-2xl" />
                <div className="absolute top-4 right-2 w-full h-60 sm:h-70 lg:h-75 bg-[#E100FF] opacity-15 rounded-xl shadow-2xl" />

                {/* Flip Card */}
                <div
                    className="relative w-full h-60 sm:h-70 lg:h-75 perspective-1000 cursor-pointer"
                    onClick={toggleCard}
                >
                    {/* FRONT */}
                    <div
                        className={`absolute w-full h-full bg-white rounded-xl shadow-2xl p-5 flex items-center justify-center text-center transition-all duration-700 ease-in-out backface-hidden ${showFront ? "rotate-y-0 z-20" : "rotate-y-180 z-10"
                            }`}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <h2 className="text-[#333] text-base sm:text-lg lg:text-2xl font-bold leading-relaxed">
                            A Digital Based and Largest <br />
                            Science Talent Search <br />
                            Examination for – Emerging India
                        </h2>
                    </div>

                    {/* BACK */}
                    <div
                        className={`absolute w-full h-full bg-white rounded-xl shadow-2xl p-5 flex items-center justify-center text-center transition-all duration-700 ease-in-out backface-hidden ${showFront ? "rotate-y-180 z-10" : "rotate-y-0 z-20"
                            }`}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <h2 className="text-[#333] text-sm sm:text-base lg:text-xl font-bold leading-relaxed">
                            NATIONAL CAMP VVM 2024–25 <br />
                            DATE: 24th & 25th MAY, 2025 <br />
                            VENUE: IIT KANPUR, UTTAR PRADESH
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MidCard;
