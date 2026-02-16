"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SchoolLevelExam2 = () => {
    return (
        <div>
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">
                    School Level Exam 2
                </h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">School Level Exam 2</span>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-4 mt-16 font-[Euclid Circular,sans-serif] text-gray-800 leading-relaxed space-y-6">
                <h1 className="text-4xl md:text-3xl font-bold text-[#0f172a] text-center uppercase">
                    School Level Online Examination (Class Wise):
                    <br />
                    <span className="text-[#0f172a]">Level-II</span>
                </h1>

                <p className="text-[15px] leading-7.5 font-medium text-gray-600">
                    The Level II school-level examination will last for{" "}
                    <strong>45 minutes</strong> and will consist of{" "}
                    <strong>50 multiple-choice questions (MCQs)</strong>, each with
                    multiple correct answers. Each question is worth{" "}
                    <strong>2 marks</strong>, and incorrect answers will incur a penalty
                    of <strong>0.5 marks</strong> (negative marking).
                </p>

                <h2 className="text-[16px] font-semibold text-gray-800">
                    The examination has two sections:
                </h2>

                <ul className="list-disc pl-6 text-[15px] font-medium text-gray-600 space-y-2">
                    <li>
                        <strong>Section A:</strong> This section contains 15 questions based
                        on the study material covering{" "}
                        <em>&#34;Indian Contributions to Science&ldquo;</em> and the life story of
                        <em>Dr. Satyendra Nath Bose</em>.
                    </li>
                    <li>
                        <strong>Section B:</strong> This section includes 35 questions that
                        align with the VVM Syllabus, taking content from NCERT textbooks,
                        various state board curricula, and incorporating questions related
                        to logic and reasoning from open sources.
                    </li>
                </ul>

                <p className="text-[15px] leading-7.5 font-medium text-gray-600">
                    Evaluation of students will be based on their performance at each
                    level. The examination will be conducted in English, Hindi, Tamil,
                    Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Bengali, Odia,
                    Assamese, Sanskrit and Urdu (major regional languages).
                </p>
            </div>

            <div className="max-w-5xl mx-auto text-left font-[Euclid Circular,sans-serif] space-y-6 leading-relaxed mt-10 px-4">
                <h2 className="pl-1 text-[18px] font-bold text-[#f97316] uppercase">
                    The Syllabus of Examination:
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-[14px]">
                        <thead className="bg-indigo-100 text-[#0f172a] font-semibold">
                            <tr>
                                <th className="px-4 py-2">Content</th>
                                <th className="px-4 py-2">Contribution</th>
                                <th className="px-4 py-2">Curriculum</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 font-medium">
                            <tr className="bg-white">
                                <td className="px-4 py-2">
                                    Science and Mathematics from text books
                                </td>
                                <td className="px-4 py-2">60% (30 questions) [2 Marks Each]</td>
                                <td className="px-4 py-2">
                                    VVM Syllabus (Text Books of NCERT & various State Boards
                                    Curriculum).
                                    <br />
                                    Please refer to the VVM website for detailed syllabus.
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2">Indian Contribution to Science*</td>
                                <td className="px-4 py-2">20% (10 Questions) [2 Marks Each]</td>
                                <td className="px-4 py-2">VVM Study Material</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-4 py-2">
                                    Life Story of Dr. Satyendra Nath Bose**
                                </td>
                                <td className="px-4 py-2">10% (5 Questions) [2 Marks Each]</td>
                                <td className="px-4 py-2">VVM Study Material</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2">Logic & Reasoning</td>
                                <td className="px-4 py-2">10% (5 Questions) [2 Marks Each]</td>
                                <td className="px-4 py-2">General Reading</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="max-w-5xl mx-auto text-left font-[Euclid Circular,sans-serif] space-y-6 leading-relaxed m-10 px-4">
                <h2 className="pl-1 text-[18px] font-bold text-[#f97316] uppercase">
                    The Pattern of Question Paper:
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-[14px]">
                        <tbody className="text-gray-600 font-medium">
                            <tr className="bg-white  ">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    Content
                                </td>
                                <td className="px-4 py-2">VI, VII, VIII, IX, X, XI</td>
                            </tr>
                            <tr className="bg-gray-50 ">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    No. of Questions
                                </td>
                                <td className="px-4 py-2">50</td>
                            </tr>
                            <tr className="bg-white ">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    Marks
                                </td>
                                <td className="px-4 py-2">100</td>
                            </tr>
                            <tr className="bg-gray-50 ">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    Negative Marking
                                </td>
                                <td className="px-4 py-2">
                                    Yes, -0.5 marks for each incorrect answer
                                </td>
                            </tr>
                            <tr className="bg-white ">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    Structure of Questions
                                </td>
                                <td className="px-4 py-2">
                                    Multiple Choice Questions with Multiple Correct Answers [2
                                    Marks each]
                                </td>
                            </tr>
                            <tr className="bg-gray-50 ">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    Segments
                                </td>
                                <td className="px-4 py-2 space-y-2">
                                    <p>
                                        <strong>Section A</strong>:<br />
                                        15 questions from:
                                        <br />
                                        1) Indian Contributions to Science
                                        <br />
                                        2) Life Story of Dr. Satyendra Nath Bose
                                    </p>
                                    <p>
                                        <strong>Section B</strong>:<br />
                                        35 questions from:
                                        <br />
                                        1) VVM Syllabus comprising Text Books of NCERT & various
                                        State Boards Curriculum (please refer to the VVM website for
                                        detailed syllabus)
                                        <br />
                                        2) Logic and Reasoning (open source)
                                    </p>
                                </td>
                            </tr>
                            <tr className="bg-white ">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    Duration (45 minutes)
                                </td>
                                <td className="px-4 py-2">
                                    <strong>Section A</strong>: 15 Minutes (15 Questions, 30
                                    Marks)
                                    <br />
                                    <strong>Section B</strong>: 30 Minutes (35 Questions, 70
                                    Marks)
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 font-semibold text-[#0f172a]">
                                    Weightage
                                </td>
                                <td className="px-4 py-2 space-y-1">
                                    <strong>Section A</strong>:
                                    <ul className="list-disc pl-5">
                                        <li>
                                            Indian Contributions to Science: 10 Questions (20 Marks)
                                        </li>
                                        <li>
                                            Life Story of Dr. Satyendra Nath Bose: 5 Questions (10
                                            Marks)
                                        </li>
                                    </ul>
                                    <strong>Section B</strong>:
                                    <ul className="list-disc pl-5">
                                        <li>Physics: 8 Questions (16 Marks)</li>
                                        <li>Chemistry: 7 Questions (14 Marks)</li>
                                        <li>Mathematics: 8 Questions (16 Marks)</li>
                                        <li>Biology: 7 Questions (14 Marks)</li>
                                        <li>Logic and Reasoning: 5 Questions (10 Marks)</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="pl-1 mb-10 text-[15px] text-gray-500 font-medium leading-relaxed">
                    The final merit list to identify participants for State Level Camp
                    would be prepared based on total marks scored in both segments namely
                    Section-A & Section-B of School Level Online Examination Level-II.
                    <br />
                    In case, there is a tie in rankings, marks obtained in Section-A will
                    be the deciding factor.
                    <br /> <br />
                    * Will be available in Digital Format from 16th August, 2025 onwards.
                    No hard copies will be provided.
                    <br />
                    ** Digital format can be accessed 45 days before the exam. No hard
                    copies will be provided.
                    <br /> <br />
                    Displaying the Marks Obtained/Secured - Marks secured/obtained by the
                    students will be available on their dashboard after the declaration of
                    the result.
                    <br />
                    Students can login into their VVM account to check the same and
                    download participation/merit certificate/s.
                    <br />
                </p>
            </div>
        </div>
    );
};

export default SchoolLevelExam2;
