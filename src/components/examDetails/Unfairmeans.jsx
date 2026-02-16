import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const UnfairMeans = () => {
    return (
        <div>
            {/* Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">Unfair Means</h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]"> UnfairMeans</span>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-2 mt-12 mb-20 space-y-9 font-[Euclid Circular,sans-serif]  text-[#111827]">
                <div className="space-y-1 text-[15px] leading-relaxed text-[#4b5563]">
                    <h2 className="text-base font-bold uppercase tracking-wide text-[#111827]">
                        UNFAIR MEANS
                    </h2>
                    <p>
                        To prevent the use of unfair means during School Level Online
                        Examinations (Level-I), the following measures will be taken:
                    </p>
                    <ul>
                        <li>
                            <b>Invigilator Visit:</b> Invigilator(s) will visit schools during
                            the time slot chosen by the school. Details regarding the
                            invigilator&lsquo;s visit and guidelines will be shared one week
                            before the date of the examination.{" "}
                        </li>
                        <li>
                            <b>Online Proctoring:</b> The examination will also be proctored
                            online.
                        </li>
                    </ul>
                    <p className="text-red-500">
                        Schools and students are expected to cooperate with the invigilators
                        and follow the guidelines to ensure a fair examination process.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnfairMeans;
