"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const page = () => {
    return (
        <div>
            {/* Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">
                    Student Awards
                </h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">Student Awards</span>
                </div>
            </div>

            {/* Content Wrapper (Table + SRIJAN) */}
            <div className="max-w-5xl mx-auto px-4 mt-12 mb-20 space-y-12 font-[Euclid Circular,sans-serif] text-[#111827]">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-left text-[15px]">
                        <thead className="bg-indigo-100 text-[#0f172a] uppercase text-[14px] font-bold">
                            <tr>
                                <th className="px-5 py-4 w-30">Level</th>
                                <th className="px-5 py-4">Name</th>
                                <th className="px-5 py-4">Selection</th>
                                <th className="px-5 py-4">Reward</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {/* LEVEL I */}
                            <tr className="bg-white">
                                <td className="px-5 py-5 font-semibold text-[#0f172a]">LEVEL – I</td>
                                <td className="px-5 py-5">SELECTION FOR LEVEL-II</td>
                                <td className="px-5 py-5">
                                    • All the successful participants will be eligible for participation in School Level Online Examination : Level-II
                                </td>
                                <td className="px-5 py-5">
                                    Participation Certificate
                                    <br />
                                    Certificates will be generated online only. Participating students can download them after logging into their profile account on our website. No printed copy will be provided.
                                </td>
                            </tr>

                            {/* LEVEL II - SCHOOL */}
                            <tr className="bg-gray-50">
                                <td className="px-5 py-5 font-semibold text-[#0f172a]">LEVEL – II</td>
                                <td className="px-5 py-5">SCHOOL TOPPERS</td>
                                <td className="px-5 py-5">
                                    The top 3 rankers per class will be SCHOOL winners (i.e. 18 students from each school). Minimum 10 students per class must be registered from a school to qualify for this category.
                                </td>
                                <td className="px-5 py-5">
                                    Merit Certificate
                                    <br />
                                    Certificates generated online only. No printed copies.
                                </td>
                            </tr>

                            {/* LEVEL II - DISTRICT */}
                            <tr className="bg-white">
                                <td className="px-5 py-5 font-semibold text-[#0f172a]">LEVEL – II</td>
                                <td className="px-5 py-5">DISTRICT TOPPERS</td>
                                <td className="px-5 py-5">
                                    Top 3 rankers per class will be DISTRICT winners (i.e. 18 students from each district). [All schools in that district are considered.]
                                </td>
                                <td className="px-5 py-5 space-y-2">
                                    <p>Merit Certificate</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Certificates generated online only.</li>
                                        <li>Download via profile login; no printed copies.</li>
                                        <li>Fee waiver for Class 6–10 in next session registration.</li>
                                        <li>Class 11: free e-copy of Science India magazine for 1 year.</li>
                                    </ul>
                                </td>
                            </tr>

                            {/* LEVEL III */}
                            <tr className="bg-gray-50">
                                <td className="px-5 py-5 font-semibold text-[#0f172a]">LEVEL – III</td>
                                <td className="px-5 py-5">STATE LEVEL WINNERS</td>
                                <td className="px-5 py-5 space-y-2">
                                    <p>Top 25 rankers per class from a state qualify for the State Level Camp.</p>
                                    <p>Top 3 rankers per class are STATE winners (i.e. 18 students per state). Includes Sāstra Pratibhā & Zone-V participants.</p>
                                </td>
                                <td className="px-5 py-5 space-y-2">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>State Camp Participation Certificate</li>
                                        <li>State Camp Memento</li>
                                        <li>₹5,000/-, ₹3,000/-, ₹2,000/- for 1st to 3rd rankers</li>
                                        <li>Free visit to NCSM unit</li>
                                    </ul>
                                </td>
                            </tr>

                            {/* LEVEL IV */}
                            <tr className="bg-white">
                                <td className="px-5 py-5 font-semibold text-[#0f172a]">LEVEL – IV</td>
                                <td className="px-5 py-5">NATIONAL LEVEL WINNERS</td>
                                <td className="px-5 py-5 space-y-2">
                                    <p>Top 2 winners per state qualify for National Camp.</p>
                                    <p>Top 3 rankers per class are NATIONAL winners (18 students). Top 3 from each zone are ZONAL winners.</p>
                                </td>
                                <td className="px-5 py-5 space-y-2">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>National Camp Memento & Participation Certificate</li>
                                        <li>₹25,000/-, ₹15,000/-, ₹10,000/- for National winners</li>
                                        <li>Internship + Bhaskara Scholarship (1 year)</li>
                                        <li>₹5,000/-, ₹3,000/-, ₹2,000/- for Zonal winners</li>
                                        <li>NCSM Innovation Hub Membership</li>
                                    </ul>
                                </td>
                            </tr>

                            {/* SCHOOLS */}
                            <tr className="bg-gray-50">
                                <td className="px-5 py-5 font-semibold text-[#0f172a]">Schools</td>
                                <td className="px-5 py-5" colSpan={3}>
                                    Schools registering 100+ students can participate in a Special Activity if they visit a nearby NCSM unit with valid tickets.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* SRIJAN & BHASKARA */}
                <div className="space-y-10 text-left">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wide mb-2">SRIJAN</h2>
                        <p className="text-[15px] leading-relaxed text-[#4b5563]">
                            Vidyarthi Vigyan Manthan 2025–26 edition will provide National (Himalayans) and Zonal Winners an opportunity to participate in an extensive training cum internship (1 to 3 weeks) in any one of the reputed national labs or premier research institutions like DRDO, ISRO, CSIR, BARC etc.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wide mb-2">BHASKARA SCHOLARSHIP</h2>
                        <p className="text-[15px] leading-relaxed text-[#4b5563]">
                            Vidyarthi Vigyan Manthan will award the Bhaskara Scholarship of Rs. 2000/- per month to the National Winners (Himalayans) for one year. A specific project/activity will be assigned to every Himalayan at the end of the SRIJAN program. The scholarship will be released quarterly based on assessment by the Student Mentorship Team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
