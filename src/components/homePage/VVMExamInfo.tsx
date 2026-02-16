/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
"use client";

import React, { useState } from "react";

const VVMExamInfo = () => {
    const [activeTab, setActiveTab] = useState("details");

    const details = [
        [
            "Eligibility",
            "Students from Class VI to XI studying under CBSE, ICSE and State Boards",
        ],
        [
            "Language",
            <>
                English, Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati,
                Punjabi, Odia, Malayalam, Assamese, Sanskrit, Urdu
                <br />
                <span className="text-red-500 text-xs italic">
                    Note: If less than 100 students are registered in any other language
                    than English or Hindi, question paper will be available in English or
                    Hindi only.
                </span>
            </>,
        ],
        ["Exam Venue", "School/Home"],
        ["Fee", "Rs. 200/- (Rupees Two Hundred only)"],
        [
            "Mode of Payment",
            <>
                Through payment gateway and ONLINE (RTGS/NEFT) payment only.{" "}
                <strong>NO CASH / DD / Cheque</strong> will be acceptable.
                <br />
                <br />
                Exam Coordinators depositing fee directly in VVM's account are requested
                to retain deposit slip with Transaction ID, Date & Time.
                <br />
                <span className="text-red-500 text-xs italic">
                    This option is not applicable for Individually registering students.
                </span>
            </>,
        ],
        [
            "ONLINE Payment Details for School Exam Coordinator Only",
            <>
                <div>
                    <strong>Current Account Number:</strong> 7009670017
                </div>
                <div>
                    <strong>Account Name:</strong> VIDYARTHI VIGYAN MANTHAN
                </div>
                <div>
                    <strong>IFSC Code:</strong> IDIB000D008
                </div>
                <div>
                    <strong>Branch Name & Address:</strong> Indian Bank, Defence Colony,
                    New Delhi
                </div>
            </>,
        ],
        [
            "Website URL",
            <a
                href="https://www.vvm.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
            >
                www.vvm.org.in
            </a>,
        ],
    ];

    const syllabus = [
        {
            content: "Science and Mathematics from text books",
            contribution: "50% (50 Questions) [1 Mark Each]",
            curriculum: "NCERT & State Board Textbooks",
        },
        {
            content: "Indian Contributions to Science",
            contribution: "20% (20 Questions)",
            curriculum: "VVM Study Material",
        },
        {
            content: "Life Story of Dr. Satyendra Nath Bose",
            contribution: "20% (20 Questions)",
            curriculum: "VVM Study Material",
        },
        {
            content: "Logic & Reasoning",
            contribution: "10% (10 Questions)",
            curriculum: "General Reading",
        },
    ];

    const syllabusLevel2 = [
        {
            content: "Science and Mathematics from text books",
            contribution: "60% (30 Questions) [2 Marks Each]",
            curriculum: "NCERT & State Board Textbooks",
        },
        {
            content: "Indian Contribution to Science",
            contribution: "20% (10 Questions)",
            curriculum: "VVM Study Material",
        },
        {
            content: "Life Story of Dr. Satyendra Nath Bose",
            contribution: "10% (5 Questions)",
            curriculum: "VVM Study Material",
        },
        {
            content: "Logic & Reasoning",
            contribution: "10% (5 Questions)",
            curriculum: "General Reading",
        },
    ];

    const awards = [
        {
            level: "School Level",
            awards: [
                "Digital participation certificate for all students",
                "Merit certificates for top performers",
            ],
        },
        {
            level: "State Level",
            awards: [
                "Top students receive State Rank certificates",
                "Invitation to State Science Camp",
            ],
        },
        {
            level: "National Level",
            awards: [
                "National Rank certificates",
                "Invitation to National Science Camp",
                "Cash prizes & scholarships",
            ],
        },
    ];

    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                {["details", "syllabus", "syllabus2", "awards"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-md font-semibold transition ${activeTab === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {tab === "details"
                            ? "VVM Details"
                            : tab === "syllabus"
                                ? "Syllabus Level I"
                                : tab === "syllabus2"
                                    ? "Syllabus Level II"
                                    : "Awards & Recognition"}
                    </button>
                ))}
            </div>

            {/* DETAILS */}
            {activeTab === "details" && (
                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                        <tbody>
                            {details.map(([title, value], idx) => (
                                <tr key={idx} className={idx % 2 ? "bg-gray-100" : "bg-white"}>
                                    <td className="px-4 py-3 font-semibold w-1/3">{title}</td>
                                    <td className="px-6 py-3">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* SYLLABUS LEVEL I */}
            {activeTab === "syllabus" && (
                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-3">Content</th>
                                <th className="px-4 py-3">Contribution</th>
                                <th className="px-4 py-3">Curriculum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {syllabus.map((s, i) => (
                                <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                                    <td className="px-4 py-3">{s.content}</td>
                                    <td className="px-4 py-3">{s.contribution}</td>
                                    <td className="px-4 py-3">{s.curriculum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* SYLLABUS LEVEL II */}
            {activeTab === "syllabus2" && (
                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-3">Content</th>
                                <th className="px-4 py-3">Contribution</th>
                                <th className="px-4 py-3">Curriculum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {syllabusLevel2.map((s, i) => (
                                <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                                    <td className="px-4 py-3">{s.content}</td>
                                    <td className="px-4 py-3">{s.contribution}</td>
                                    <td className="px-4 py-3">{s.curriculum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* AWARDS */}
            {activeTab === "awards" && (
                <div className="grid md:grid-cols-3 gap-6">
                    {awards.map((level, i) => (
                        <div key={i} className="border rounded-lg overflow-hidden">
                            <div className="bg-blue-600 text-white px-4 py-3 font-bold">
                                {level.level}
                            </div>
                            <ul>
                                {level.awards.map((a, j) => (
                                    <li key={j} className="px-4 py-3 border-t text-sm">
                                        {a}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VVMExamInfo;
