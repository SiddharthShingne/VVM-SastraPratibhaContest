"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SchoolLevelExam1 = () => {
    return (
        <div>
            {/* Hero Header */}
            <div className="bg-linear-to-b from-[#f9faff] to-[#eef0ff] py-24 text-center">
                <h1 className="text-5xl font-bold text-[#111d35] mb-4">
                    School Level Exam 1
                </h1>
                <div className="flex justify-center items-center space-x-1 text-base font-medium text-gray-500">
                    <Link href="/" className="hover:text-[#7f00ff] transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Exam Details</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#111d35]">School Level Exam 1</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto text-left font-[Euclid Circular,sans-serif] space-y-6 leading-relaxed mt-10 px-4">
                <h1 className="text-4xl md:text-3xl font-bold text-[#0f172a] text-center uppercase">
                    School Level Online Examination (Class Wise):
                    <br />
                    <span className="text-[#0f172a]">Level-I</span>
                </h1>

                <p className="pl-1 text-[15px] leading-7.5 font-semibold text-gray-500">
                    Level – I school level examination will be of{" "}
                    <strong>one hour and thirty minutes</strong> duration with{" "}
                    <strong>100 multiple choice questions</strong> – each weighted for one
                    mark. Examination will consist of two segments viz.{" "}
                    <strong>Section-A</strong> (comprising 40 questions from study
                    material <em>Indian Contributions to Science</em> and{" "}
                    <em>Life Story of Dr. Satyendra Nath Bose</em> (to be provided by
                    Vijnana Bharati)) & <strong>Section-B</strong> (comprising 60
                    questions based on the VVM Syllabus (Based on Text Books of NCERT &
                    various State Boards Curriculum) & Logic and Reasoning (open source)).
                    A detailed syllabus is provided on VVM’s website. The examination will
                    be conducted class-wise.
                </p>

                <p className="pl-1 text-[15px] leading-7.5 font-semibold text-gray-500">
                    Evaluation of students will be based on their performance at each
                    level. The examination will be conducted in English, Hindi, Tamil,
                    Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Bengali, Odia,
                    Assamese, Sanskrit and Urdu (major regional languages).
                </p>

                <p className="pl-1 text-[15px] leading-7.5 font-semibold text-red-500">
                    Note:{" "}
                    <span className="text-gray-500">
                        If less than 100 students are registered in any other language than
                        English or Hindi, question paper will be available in English or
                        Hindi only.
                    </span>
                </p>

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
                                <td className="px-4 py-2 ">50% (50 Questions) [1 Mark Each]</td>
                                <td className="px-4 py-2 ">
                                    VVM Syllabus (Text Books of NCERT & various State Boards
                                    Curriculum).
                                    <br />
                                    Please refer to the VVM website for detailed syllabus.
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 ">Indian Contributions to Science*</td>
                                <td className="px-4 py-2 ">20% (20 Questions) [1 Mark Each]</td>
                                <td className="px-4 py-2 ">VVM Study Material</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-4 py-2 ">
                                    Life Story of Dr. Satyendra Nath Bose*
                                </td>
                                <td className="px-4 py-2 ">20% (20 Questions) [1 Mark Each]</td>
                                <td className="px-4 py-2 ">VVM Study Material</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 ">Logic & Reasoning</td>
                                <td className="px-4 py-2 ">10% (10 Questions) [1 Mark Each]</td>
                                <td className="px-4 py-2 ">General Reading</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-10 font-[Euclid Circular,sans-serif] text-gray-700 space-y-6">
                <h2 className="text-[18px] font-bold text-[#f97316] uppercase">
                    The Pattern of Question Paper:
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-[14px]">
                        <thead className="bg-indigo-100 text-[#0f172a] font-semibold">
                            <tr>
                                <th className="px-4 py-2 w-1/3">Parameter</th>
                                <th className="px-4 py-2">Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 font-medium">
                            <tr className="bg-white ">
                                <td className="px-4 py-3 font-semibold">Content</td>
                                <td className="px-4 py-3">VI, VII, VIII, IX, X, XI</td>
                            </tr>
                            <tr className="bg-gray-50 ">
                                <td className="px-4 py-3 font-semibold">No. of Questions</td>
                                <td className="px-4 py-3">100</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-4 py-3 font-semibold">Marks</td>
                                <td className="px-4 py-3">100*</td>
                            </tr>
                            <tr className="bg-gray-50 ">
                                <td className="px-4 py-3 font-semibold">
                                    Structure of Questions
                                </td>
                                <td className="px-4 py-3">
                                    Multiple Choice Questions [1 Mark Each]
                                </td>
                            </tr>
                            <tr className="bg-white  align-top">
                                <td className="px-4 py-3 font-semibold">Segments</td>
                                <td className="px-4 py-3 space-y-2">
                                    <div>
                                        <strong>Section A</strong>: 40 Questions from
                                        <ul className="list-disc pl-6 mt-1">
                                            <li>Indian Contributions to Science</li>
                                            <li>Life Story of Dr. Satyendra Nath Bose</li>
                                        </ul>
                                    </div>
                                    <div className="mt-3">
                                        <strong>Section B</strong>: 60 Questions from
                                        <ul className="list-disc pl-6 mt-1">
                                            <li>VVM Syllabus (NCERT & State Boards Curriculum)</li>
                                            <li>Logic and Reasoning (open source)</li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-gray-50 ">
                                <td className="px-4 py-3 font-semibold">Duration</td>
                                <td className="px-4 py-3">
                                    Section A: 30 Minutes (40 Questions, 40 Marks)
                                    <br />
                                    Section B: 60 Minutes (60 Questions, 60 Marks)
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-4 py-3 font-semibold">
                                    Qualifying Criterion
                                </td>
                                <td className="px-4 py-3">
                                    Answers of Section-B will be evaluated only if a student
                                    secures at least 50% (20 marks) in Section-A.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="pl-1  mb-8   text-[15px] text-gray-600 font-medium">
                    <strong>Note:</strong> Answers to Section-B will be evaluated only if
                    a student secures equal to or more than 50% (i.e., 20 Marks) in
                    Section-A. In case of a tie in rankings, marks obtained in Section-A
                    will be the deciding factor.
                </p>
            </div>
        </div>
    );
};

export default SchoolLevelExam1;
