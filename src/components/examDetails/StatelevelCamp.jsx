"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const StateLevelCamp = () => {
    return (
        <div>
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">
                    State Level Camp
                </h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">State Level Camp</span>
                </div>
            </div>
            <div className="max-w-5xl mx-auto text-left font-[Euclid Circular,sans-serif] space-y-6 leading-relaxed mt-10 px-4">
                <h1 className="text-2xl font-bold text-[#0f172a] uppercase">
                    State Level Camp (SLC): Level-III
                </h1>

                <p className="text-[15px] text-gray-500 font-medium mb-20">
                    The top 25 rankers from each class for every state will be identified to participate in the one or two-day State Level Camp (SLC). The camp will be organized at any location within the state.<br />
                    <br />
                    The State Level Camp will focus on Application Orientated Multiple Choice Questions, Hands-On Activities, Observation and Analysis, Situational Problem Solving Ability and a series of other activities. States will be clubbed according to the number of students who appeared for the examination, as per consideration of their geographical and cultural resemblance, and the convenience of the students.<br />
                    <br />
                    Selected students will have to bear their travel expenses to attend the State Level Camp. No travel support for this purpose will be provided. The venue and other details will be updated on the website as well as communicated to all selected students by the respective state coordinator(s).<br />
                    <br />
                    <strong className="text-gray-700">Displaying the Marks Obtained/Secured</strong> - Marks secured/obtained by the students will be available on their dashboard after one week of the declaration of the result. Students can login into their VVM account to check the same.<br />
                    <br />
                    <strong className="text-gray-700">Tiebreaker</strong> - In case, there is a tie in rankings the student(s) will be invited for Viva-Voce comprising three questions and the one scoring the highest mark(s) will be declared as the winner.
                </p>
            </div>

        </div>
    );
};

export default StateLevelCamp;
