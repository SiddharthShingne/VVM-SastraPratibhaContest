"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const Syllabus = () => {
    return (
        <div className="font-[Euclid Circular,sans-serif]">
            {/* ===== HERO HEADER ===== */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">Syllabus</h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">Syllabus</span>
                </div>
            </div>
            {/* ===== MAIN SYLLABUS SECTION ===== */}
            <div className="max-w-5xl mx-auto text-gray-800 font-[Euclid Circular,sans-serif] space-y-12 py-16 text-[13px] leading-relaxed">
                <h2 className="text-2xl font-bold text-center text-[#0f172a] uppercase">
                    The Syllabus of Examination
                </h2>
                {/* ===== LEVEL I ===== */}
                <div>
                    <h3 className="text-sm font-bold text-[#0f172a] uppercase mb-3">
                        School Level Exam Level - I
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-indigo-100 text-[#0f172a] font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Content</th>
                                    <th className="py-3 px-4">Contribution</th>
                                    <th className="py-3 px-4">Curriculum</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3 px-4">
                                        Science and Mathematics from textbooks
                                    </td>
                                    <td className="py-3 px-4">
                                        50% (50 Questions) [1 Mark Each]
                                    </td>
                                    <td className="py-3 px-4">
                                        VVM Syllabus (Text Books of NCERT & various State Boards
                                        Curriculum). Refer VVM website.
                                    </td>
                                </tr>
                                <tr className="bg-[#f9f9f9]">
                                    <td className="py-3 px-4 italic">
                                        Indian Contributions to Science*
                                    </td>
                                    <td className="py-3 px-4">
                                        20% (20 Questions) [1 Mark Each]
                                    </td>
                                    <td className="py-3 px-4">VVM Study Material</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 italic">
                                        Life Story of Dr. Satyendra Nath Bose**
                                    </td>
                                    <td className="py-3 px-4">
                                        20% (20 Questions) [1 Mark Each]
                                    </td>
                                    <td className="py-3 px-4">VVM Study Material</td>
                                </tr>
                                <tr className="bg-[#f9f9f9]">
                                    <td className="py-3 px-4">Logic & Reasoning</td>
                                    <td className="py-3 px-4">
                                        10% (10 Questions) [1 Mark Each]
                                    </td>
                                    <td className="py-3 px-4">General Reading</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ===== LEVEL II ===== */}
                <div>
                    <h3 className="text-sm font-bold text-[#0f172a] uppercase mb-3">
                        School Level Exam Level - II
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-indigo-100 text-[#0f172a] font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Content</th>
                                    <th className="py-3 px-4">Contribution</th>
                                    <th className="py-3 px-4">Curriculum</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3 px-4">
                                        Science and Mathematics from textbooks
                                    </td>
                                    <td className="py-3 px-4">
                                        60% (30 Questions) [2 Marks Each]
                                    </td>
                                    <td className="py-3 px-4">
                                        VVM Syllabus (Text Books of NCERT & various State Boards
                                        Curriculum). Refer VVM website.
                                    </td>
                                </tr>
                                <tr className="bg-[#f9f9f9]">
                                    <td className="py-3 px-4 italic">
                                        Indian Contributions to Science*
                                    </td>
                                    <td className="py-3 px-4">
                                        20% (10 Questions) [2 Marks Each]
                                    </td>
                                    <td className="py-3 px-4">VVM Study Material</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 italic">
                                        Life Story of Dr. Satyendra Nath Bose**
                                    </td>
                                    <td className="py-3 px-4">
                                        10% (5 Questions) [2 Marks Each]
                                    </td>
                                    <td className="py-3 px-4">VVM Study Material</td>
                                </tr>
                                <tr className="bg-[#f9f9f9]">
                                    <td className="py-3 px-4">Logic & Reasoning</td>
                                    <td className="py-3 px-4">
                                        10% (5 Questions) [2 Marks Each]
                                    </td>
                                    <td className="py-3 px-4">General Reading</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ===== LEVEL III ===== */}
                <div>
                    <h3 className="text-2xl font-bold text-black-600 uppercase mb-3 text-left">
                        State Level Camp (SLC): Level - III
                    </h3>
                    <p className="pl-1 text-[15px]  font-medium text-gray-500 text-left">
                        The top 25 rankers from each class for every state will be
                        identified to participate in the one or two-day State Level Camp
                        (SLC). <br />
                        The camp will be organized at any location within the state. <br />
                        The State Level Camp will focus on Application Orientated Multiple
                        Choice Questions, Hands-On Activities, Observation and Analysis,
                        Situational Problem Solving Ability and a series of other
                        activities. <br />
                        States will be clubbed according to the number of students who
                        appeared for the examination, as per consideration of their
                        geographical and cultural resemblance, and the convenience of the
                        students. <br />
                        Selected students will have to bear their travel expenses to attend
                        the State Level Camp. <br />
                        No travel support for this purpose will be provided. <br />
                        The venue and other details will be updated on the website as well
                        as communicated to all selected students by the respective state
                        coordinator(s). <br />
                        Displaying the Marks Obtained/Secured - Marks secured/obtained by
                        the students will be available on their dashboard after one week of
                        the declaration of the result. <br />
                        Students can login into their VVM account to check the same. <br />
                        Tiebreaker - In case, there is a tie in rankings the student(s) will
                        be invited for Viva-Voce comprising three questions and the one
                        scoring the highest mark(s) will be declared as the winner. <br />
                    </p>
                </div>

                {/* ===== LEVEL IV ===== */}
                <div>
                    <h3 className="text-2xl font-bold text-black-600 uppercase mb-3 text-left">
                        National Camp (NC): Level - IV
                    </h3>
                    <p className="pl-1 text-[15px] font-medium text-gray-500 text-left">
                        Top two students from each class i.e. total 12 students from each
                        state will be invited to a two-day National Camp. <br />
                        The National Camp (NC) will comprise of Presentations, Activities to
                        test Scientific Understanding, Innovation, Creativity, Out-of-Box
                        Thinking and Assessment of Leadership Quality. <br />
                        Selected students will have to bear their travel expense to attend
                        the National Camp. <br />
                        No travel support for this purpose will be provided. <br />
                        Organisers will make boarding and lodging arrangements. <br />
                        Necessary details regarding venue and others will be provided to all
                        the students selected for participation in the National Camp by the
                        respective state coordinator(s). <br />
                        Displaying the Marks Obtained/Secured - Marks secured/obtained by
                        the students will be available on their dashboard after one week of
                        the declaration of the result. <br />
                        Students can login into their VVM account to check the same. <br />
                        Tiebreaker - In case, there is a tie in rankings the student(s) will
                        be invited for Viva-Voce comprising three questions and the one
                        scoring the highest mark(s) will be declared as the winner. <br />
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Syllabus;
