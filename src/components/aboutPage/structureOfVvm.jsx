
"use client";
import Link from "next/link";

const methods = [
    {
        title: "Objective type Multiple Choice Questions",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <rect x="10" y="12" width="44" height="40" rx="6" />
                <path d="M18 22h20M18 30h20M18 38h12" />
                <circle cx="42" cy="38" r="4" />
            </svg>
        ),
    },
    {
        title: "Comprehensive writing",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <path d="M16 44l4-12 20-20 8 8-20 20-12 4z" />
                <path d="M36 16l8 8" />
            </svg>
        ),
    },
    {
        title: "Presentation and Group discussion",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <circle cx="22" cy="26" r="6" />
                <circle cx="42" cy="26" r="6" />
                <path d="M12 44c2-6 8-8 10-8s8 2 10 8" />
                <path d="M32 44c2-6 8-8 10-8s8 2 10 8" />
            </svg>
        ),
    },
    {
        title: "Role Play",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <path d="M20 20c6-6 18-6 24 0v16c-6 6-18 6-24 0z" />
                <path d="M24 28h4M36 28h4M26 36c4 2 8 2 12 0" />
            </svg>
        ),
    },
    {
        title: "Guess Word Examination",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <path d="M26 10v14l-10 18a6 6 0 006 8h20a6 6 0 006-8l-10-18V10" />
                <path d="M22 30h20" />
            </svg>
        ),
    },
    {
        title: "Methods of Science",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="#f4df17" strokeWidth="2">
                <circle cx="16" cy="32" r="4" />
                <circle cx="32" cy="16" r="4" />
                <circle cx="48" cy="32" r="4" />
                <circle cx="32" cy="48" r="4" />
                <path d="M20 32h24M32 20v24" />
            </svg>
        ),
    },
];

const WhatIsVVM = () => {
    return (
        <div>
            {/* ================= Breadcrumb Header ================= */}
            <div className="bg-[#162a4a] py-12.5">
                <div className="max-w-6xl mx-auto px-4 text-white">
                    <h1 className="text-[27px] font-medium mb-1">
                        Structure Of  Śāstra Pratibhā Contest
                    </h1>

                    <p className="text-[12px] opacity-90">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>{" "}
                        {" > "} About {" > "} Structure Of  Śāstra Pratibhā Contest
                    </p>
                </div>
            </div>

            {/* Section */}
            <div className="bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-4">

                    <h2 className="text-[36px] font-extrabold uppercase tracking-[1.5px] text-[#1c51a7] text-center mb-4">
                        Structure Of  Śāstra Pratibhā Contest
                    </h2>

                    <p className="text-center text-[black] text-base font-semibold max-w-2xl mx-auto mb-10">
                        Students participating in the Śāstra Pratibhā Contest will undergo the following multi-level assessments.
                    </p>
                    <p className="text-center text-[black] text-base font-semibold max-w-2xl mx-auto mb-10">The assessment pattern for each country will be decided by the Science India/International forum</p>
                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {methods.map((item, index) => (
                            <div key={index} className="flex">

                                <div className="
                                    relative w-full text-center p-6 rounded-2xl
                                    bg-white/75 backdrop-blur-xl border border-white/60
                                    shadow-[0_20px_45px_rgba(23,57,92,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]
                                    transition-all duration-300
                                    hover:-translate-y-2
                                    hover:shadow-[0_25px_55px_rgba(23,57,92,0.18)]
                                ">

                                    {/* Gradient Top Border */}
                                    <div className="absolute top-0 left-0 w-full h-[4px] 
                                        bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                                    {/* ICON BOX */}
                                    <div className="
                                        w-[70px] h-[70px] mx-auto mb-4 rounded-[18px]
                                        bg-linear-to-br from-[#17395c] to-[#244d79]
                                        flex items-center justify-center
                                        shadow-[0_10px_25px_rgba(23,57,92,0.25)]
                                    ">
                                        <div className="w-[40px] h-[40px]">
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* TITLE */}
                                    <h5 className="text-[16px] font-extrabold text-[#17395c] leading-relaxed">
                                        {item.title}
                                    </h5>

                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Bottom Text */}
                    <div className="text-center mt-10 space-y-4">
                        <p className="text-[16px] text-[#555] max-w-4xl mx-auto leading-relaxed font-medium">
                            For the winners of VVM, the program also includes visits to National Science Laboratories,
                            centres of repute and interaction with renowned scientists.
                        </p>

                        <p className="text-[16px] text-[#555] max-w-4xl mx-auto leading-relaxed font-medium">
                            Each student will be evaluated vis-à-vis his/her class peers at all stages.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WhatIsVVM;