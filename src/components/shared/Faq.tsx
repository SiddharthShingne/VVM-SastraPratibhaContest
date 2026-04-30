"use client";

import { useState } from "react";
import Link from "next/link";

type FAQGroup = {
    title: string;
    items: {
        question: string;
        answer: React.ReactNode;
    }[];
};

export default function FAQ() {
    const [openGroup, setOpenGroup] = useState<number | null>(0);
    const [openItem, setOpenItem] = useState<number | null>(0);

    const toggleGroup = (index: number) => {
        setOpenGroup(openGroup === index ? null : index);
        setOpenItem(null);
    };

    const toggleItem = (index: number) => {
        setOpenItem(openItem === index ? null : index);
    };

    const faqGroups: FAQGroup[] = [
        {
            title: "General Support",
            items: [
                {
                    question: "1. Login Issues",
                    answer: (
                        <>
                            {/* <p>
                                Login Page:{" "}
                                <a
                                    href="https://vvm.org.in/Login"
                                    target="_blank"
                                    className="text-blue-600 underline"
                                >
                                    https://vvm.org.in/Login
                                </a>
                            </p> */}
                            <p>Use your registered ID and password to log in.</p>
                        </>
                    ),
                },
                {
                    question: "2. Finding Your Username and Password",
                    answer: (
                        <>
                            <p>
                                Credentials are sent to your registered email ID during
                                registration.
                            </p>
                            <p>Please check your Spam/Junk folder if not found.</p>
                        </>
                    ),
                },
                // {
                //     question: "3. Invalid ID or Password Error",
                //     answer: (
                //         <>
                //             <p>
                //                 Ensure you are registered on{" "}
                //                 <a
                //                     href="https://vvm.org.in"
                //                     target="_blank"
                //                     className="text-blue-600 underline"
                //                 >
                //                     https://vvm.org.in
                //                 </a>
                //             </p>
                //             <p>
                //                 If registered on vvmuat, please register again on official site.
                //             </p>
                //             <p>
                //                 Need help?{" "}
                //                 <a
                //                     href="https://vvm.org.in/contact-us"
                //                     target="_blank"
                //                     className="text-blue-600 underline"
                //                 >
                //                     Contact support
                //                 </a>
                //             </p>
                //         </>
                //     ),
                // },
                {
                    question: "3. Forgot Password",
                    answer: (
                        <p>
                            Visit the login page{" "}
                            {/* <a
                                href="https://vvm.org.in/Login"
                                target="_blank"
                                className="text-blue-600 underline"
                            >
                                https://vvm.org.in/Login
                            </a>{" "} */}
                            and click “Forgot Password”.
                        </p>
                    ),
                },
                // {
                //     question: "5. Important Dates",
                //     answer: (
                //         <p>
                //             All important dates are available{" "}
                //             <Link
                //                 href="/#important-dates"
                //                 className="text-blue-600 underline"
                //             >
                //                 here
                //             </Link>
                //             .
                //         </p>
                //     ),
                // },
                {
                    question: "4. Question Bank Availability",
                    answer: <p>Currently unavailable.</p>,
                },
                {
                    question: "5. Study Material Availability",
                    answer: (
                        <>
                            {/* <p>Available on both portals:</p> */}
                            <ul className="list-disc ml-5">
                                {/* <li>School Portal → Study Material → Download</li> */}
                                <li>Student Portal → Study Material → Download</li>
                            </ul>
                        </>
                    ),
                },
                // {
                //     question: "8. Student Bulk Upload Issues",
                //     answer: (
                //         <>
                //             <p>Ensure your data matches the sample Excel format.</p>
                //             <p>
                //                 Path: School Portal → Student → Add Student → Download Sample
                //                 File
                //             </p>
                //         </>
                //     ),
                // },
                {
                    question: "System Requirements & Support",
                    answer: (
                        <ul className="list-disc ml-5">
                            <li>Windows 10+</li>
                            <li>macOS Big Sur+</li>
                            <li>Linux Ubuntu 20.04+</li>
                        </ul>
                    ),
                },
                {
                    question: "Supported Browsers",
                    answer: (
                        <>
                            <table className="w-full border text-sm mt-2">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Browser</th>
                                        <th className="p-2 border">Version</th>
                                        <th className="p-2 border">OS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 border">Chrome</td>
                                        <td className="p-2 border">v138+</td>
                                        <td className="p-2 border">All</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ),
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#f4f6fb]">
            {/* ================= Breadcrumb Header ================= */}
            <div className="bg-[#162a4a] py-12.5">
                <div className="max-w-6xl mx-auto px-4 text-white">
                    <h1 className="text-[27px] font-medium mb-1">
                        Frequently Asked Questions
                    </h1>

                    <p className="text-[12px] opacity-90">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>{" "}
                        {" > "} FAQ
                    </p>
                </div>
            </div>

            {/* ================= MAIN SECTION ================= */}
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    {/* ================= Glass Card ================= */}
                    <div
                        className="relative rounded-[28px] overflow-hidden 
        bg-white/75 border border-white/60 backdrop-blur-xl 
        shadow-[0_22px_50px_rgba(23,57,92,0.11)]"
                    >
                        {/* Top Gradient Line */}
                        <div
                            className="absolute top-0 left-0 w-full h-1.25 
          bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]"
                        />

                        <div className="p-8">
                            {/* HEADER */}
                            <div className="text-center mb-8">
                                <span className="text-[20px] font-semibold">Support</span>

                                <h2 className="text-[35px] font-extrabold text-[#17395c] mt-2">
                                    FAQ
                                </h2>
                            </div>

                            {/* ================= ACCORDION ================= */}
                            <div className="space-y-5">
                                {faqGroups.map((group, gIndex) => (
                                    <div
                                        key={gIndex}
                                        className="rounded-[20px] overflow-hidden 
                border border-[#17395c1a]
                shadow-[0_10px_25px_rgba(23,57,92,0.06)]"
                                    >
                                        {/* GROUP HEADER */}
                                        <button
                                            onClick={() => toggleGroup(gIndex)}
                                            className="w-full flex justify-between items-center 
                  px-6 py-5 text-left 
                  bg-linear-to-br from-[#17395c] to-[#244d79] 
                  text-white"
                                        >
                                            <span className="text-[16px] font-semibold">
                                                {group.title}
                                            </span>

                                            <span
                                                className={`w-9 h-9 flex items-center justify-center 
                    rounded-full text-lg font-bold transition-all
                    ${openGroup === gIndex
                                                        ? "bg-white text-[#17395c]"
                                                        : "bg-white/20 text-white"
                                                    }`}
                                            >
                                                {openGroup === gIndex ? "−" : "+"}
                                            </span>
                                        </button>

                                        {/* GROUP CONTENT */}
                                        {openGroup === gIndex && (
                                            <div className="p-5 bg-white space-y-3">
                                                {group.items.map((item, iIndex) => (
                                                    <div
                                                        key={iIndex}
                                                        className="rounded-[14px] border border-[#17395c1a] 
                        overflow-hidden hover:bg-yellow-50 transition"
                                                    >
                                                        {/* ITEM HEADER */}
                                                        <button
                                                            onClick={() => toggleItem(iIndex)}
                                                            className="w-full flex justify-between items-center 
                          px-4 py-4 text-left"
                                                        >
                                                            <span className="text-[15px] font-semibold text-[#17395c]">
                                                                {item.question}
                                                            </span>

                                                            <span className="text-[#17395c] text-lg font-bold">
                                                                {openItem === iIndex ? "−" : "+"}
                                                            </span>
                                                        </button>

                                                        {/* ITEM CONTENT */}
                                                        {openItem === iIndex && (
                                                            <div className="px-4 pb-4 text-[14px] text-[#4f6480] leading-relaxed">
                                                                {item.answer}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
