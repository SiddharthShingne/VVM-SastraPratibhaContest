import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const ŚāstraPratibhāContest = () => {
    return (
        <div>
            {/* About Heading */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-26 text-center">
                <h1 className="text-6xl md:text-6xl font-extrabold text-[#111d35] mb-4">
                    Śāstra Pratibhā Contest
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
            <div className="bg-white mt-10 pb-15 px-4 sm:px-6 lg:px-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-5 sm:p-7 font-[Euclid Circular,sans-serif]">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl px-4 py-5 font-bold text-[#111d35] tracking-tight leading-tight">
                                Śāstra Pratibhā Contest (International Edition of VVM)
                            </h2>
                            <p className="text-gray-500 text-justify py-7 px-4 mt-4 mb-2 text-lg leading-relaxed font-light">
                                <strong className="font-semibold">
                                    Vidyarthi Vigyan Manthan (International Edition of VVM){" "}
                                </strong>
                                is conducted in the Middle Eastern Countries namely Bahrain,
                                Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates
                                with the name of Śāstra Pratibhā Contest by Science India Forum,
                                an overseas unit of Vijnana Bharati. This year onwards, top 2
                                rankers (Class VI - XI) of the Śāstra Pratibhā Contest will also
                                participate in the National Level Camp Examination. These
                                students will be considered eligible for National Level Winners
                                (Himalayan) selection. A separate zone (Zone 5) will be created
                                for Middle Eastern Countries to declare Zonal Level Winners.
                                Zone 5 winners will be announced only if at least 6 students (in
                                a class) attend the National Level Camp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ŚāstraPratibhāContest;
