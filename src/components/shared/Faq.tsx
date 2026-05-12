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
            title: "Support – Frequently Asked Questions (FAQ)",
            items: [
                {
                    question: "1. Registration FAQs",
                    answer: (
                        <>
                            <p>
                                <strong>Where can I get full info?</strong>
                                <br />
                                {/* <a
                                    href="https://vvm.org.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    sif official website
                                </a> */}
                                Visit official website
                            </p>

                            <p>
                                <strong>How to register?</strong>
                                <br />
                                Go to website → Register → Fill details
                            </p>

                            {/* <p>
              <strong>Already registered last year?</strong>
              <br />
              Use previous credentials → Update profile → Payment
            </p> */}

                            <p>
                                <strong>OTP not received?</strong>
                                <br />
                                Check spam / try again later
                            </p>


                          
                        </>
                    ),
                },

                {
                    question: "2. Login & Password FAQs",
                    answer: (
                        <>
                            <p>
                                <strong>Login:</strong> Enter username & password
                            </p>

                            <p>
                                <strong>Forgot Password:</strong> Reset via email
                            </p>

                            <p>
                                <strong>Issues:</strong>
                            </p>

                            <ul className="list-disc pl-5">
                                <li>Wrong credentials</li>
                                <li>Case-sensitive password</li>
                                <li>Not registered</li>
                            </ul>

                            {/* <p>
              <strong>Support:</strong> vvmsupport2627@gmail.com
            </p> */}
                        </>
                    ),
                },

                {
                    question: "3. Student Profile & Dashboard",
                    answer: (
                        <>
                            <p>
                                <strong>After login:</strong> Complete profile 
                            </p>

                            <p>
                                <strong>Why update?</strong> Ensure correct information
                            </p>

                            <p>
                                <strong>Dashboard:</strong> Profile, Password, Syllabus , Study Material, Logout
                            </p>
                        </>
                    ),
                },

                {
                    question: "4. Student Registration & Data",
                    answer: (
                        <>
                            <p>
                                <strong>Required:</strong> Name, DOB, Class, School Name, Email,
                                Mobile , all those which are mentioned in the form
                            </p>

                            <p>
                                <strong>Edit allowed?</strong> Yes (before exam phase)
                            </p>

                            <p>
                                <strong>Wrong details?</strong> May affect exam/results
                            </p>
                        </>
                    ),
                },

                //   {
                //     question: "5. Payment FAQs",
                //     answer: (
                //       <>
                //         <p>
                //           <strong>Payment:</strong> UPI / QR / Card
                //         </p>

                //         <p>
                //           <strong>Who pays?</strong> School or Student
                //         </p>

                //         <p>
                //           <strong>Not updated?</strong> Wait 48 hours
                //         </p>

                //         <p>
                //           <strong>Unpaid?</strong> Cannot give exam
                //         </p>
                //       </>
                //     ),
                //   },

                {
                    question: "6. Study Material",
                    answer: (
                        <>
                            <p>Available in Dashboard → Study Material</p>
                            <p>Languages: English</p>
                            <p>Uploading soon if not visible</p>
                        </>
                    ),
                },

                //   {
                //     question: "7. Exam & Mock Test",
                //     answer: (
                //       <>
                //         <p>Mock test available</p>
                //         <p>Duration: 45 minutes</p>
                //         <p>Negative marking: 0.5</p>
                //         <p>Mock not compulsory but recommended</p>
                //       </>
                //     ),
                //   },

                {
                    question: "8. Results",
                    answer: (
                        <>
                            <p>Check Dashboard → Results</p>
                            <p>Includes subject-wise & overall performance</p>
                            <p>Date as per Important Dates section</p>
                        </>
                    ),
                },

                //       {
                //         question: "9. School FAQs",
                //         answer: (
                //           <>
                //             <p>
                //               <strong>Who logs in?</strong> Coordinator / Principal / Staff
                //             </p>

                //             <p>
                //               <strong>Add students:</strong>
                //             </p>

                //             <ul className="list-disc pl-5">
                //               <li>Single entry</li>
                //               <li>Bulk upload (Excel)</li>
                //             </ul>
                // {/* 
                //             <p>
                //               <strong>Referral student:</strong> Share Unique Code
                //             </p> */}

                //             <p>
                //               <strong>Tracking:</strong> Payment, Exam status, Results
                //             </p>
                //           </>
                //         ),
                //       },

                {
                    question: "10. Support & Help",
                    answer: (
                        <>
                            <p>
                                <strong>Contact:</strong>
                            </p>

                            <p>State cordinators → Support Team</p>

                            <p>
                                <strong>Where to find?</strong>
                            </p>

                            <p>In home page →  choose Contact Us option in Navbar </p>
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


