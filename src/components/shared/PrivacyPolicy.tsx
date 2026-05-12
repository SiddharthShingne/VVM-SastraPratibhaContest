/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#f4f6fb]">
            {/* ================= Breadcrumb Header ================= */}
            <div className="bg-[#162a4a] py-12.5">
                <div className="max-w-6xl mx-auto px-4 text-white">
                    <h1 className="text-[27px] font-medium mb-1">Privacy Policy</h1>

                    <p className="text-[12px] opacity-90">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>{" "}
                        {" > "} Privacy Policy
                    </p>
                </div>
            </div>

            {/* ================= MAIN ================= */}
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Glass Card */}
                    <div
                        className="relative rounded-[28px] overflow-hidden 
            bg-white/75 border border-white/60 backdrop-blur-xl 
            shadow-[0_22px_50px_rgba(23,57,92,0.11)]"
                    >
                        {/* Gradient Top Border */}
                        <div
                            className="absolute top-0 left-0 w-full h-1.25 bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]"
                        />

                        <div className="p-8">
                            {/* Header */}
                            <div className="text-center mb-10">
                                <h2 className="text-[35px] font-extrabold text-[#17395c] mt-2">
                                    Privacy Policy
                                </h2>
                            </div>

                            {/* ================= CONTENT ================= */}
                            <div className="space-y-6 text-[#4f6480] text-[15px] leading-relaxed">
                                {/* Section */}
                                <Section title="1. Who Can Use This App">
                                    This app is designed for students from Class 6 to Class 11.
                                    Students receive login credentials (ID and password) from
                                    their school or organization to access the app.
                                </Section>

                                <Section title="2. Information We Collect">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>
                                            <b>Login Credentials:</b> ID and password provided by the
                                            institution.
                                        </li>
                                        <li>
                                            <b>Storage Access:</b> Required to securely store
                                            exam-related files.
                                        </li>
                                        <li>
                                            <b>Exam Data:</b> Answers, results, and academic records.
                                        </li>
                                        <li>
                                            <b>Usage Data:</b> Login time, activity logs, device
                                            details.
                                        </li>
                                        <li>
                                            <b>Connectivity Status:</b> Internet availability during
                                            exams.
                                        </li>
                                    </ul>
                                </Section>

                                <Section title="3. Permissions Required">
                                    <ul className="list-disc pl-5 space-y-1">

                                        <li>Storage Permission for saving exam data</li>
                                        <li>
                                            No screenshots or screen recording allowed during exams
                                        </li>
                                    </ul>
                                </Section>

                                <Section title="4. How We Use the Data">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Enable login and exam participation</li>
                                        <li>Verify identity and ensure exam integrity</li>
                                        <li>Record answers and generate results</li>
                                        <li>Improve user experience and system performance</li>
                                    </ul>
                                </Section>

                                <Section title="5. Data Sharing & Security">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>
                                            We do not sell or share student data with third parties
                                        </li>
                                        <li>Data is used strictly for exam-related purposes</li>
                                        <li>
                                            Security measures are implemented within the application
                                        </li>
                                    </ul>
                                </Section>

                                <Section title="6. Children’s Privacy">
                                    This app is intended for students aged approximately 10–17.
                                    Only essential data is collected, and usage is overseen by
                                    parents and institutions.
                                </Section>

                                <Section title="7. Your Rights">
                                    Students or parents can request access, correction, or
                                    deletion of personal data by contacting:
                                    <br />
                                    <span className="font-semibold text-[#17395c]">
                                        Email:
                                    </span>
                                </Section>

                                <Section title="8. Changes to This Policy">
                                    This Privacy Policy may be updated from time to time. Updates
                                    will be communicated through the app and website.
                                </Section>

                                <Section title="9. Contact Us">
                                    For any questions regarding privacy:
                                    <br />
                                    <span className="font-semibold text-[#17395c]">
                                        Email:
                                    </span>
                                </Section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================= Reusable Section Component ================= */
function Section({ title, children }: any) {
    return (
        <div
            className="p-5 rounded-[18px] 
      bg-linear-to-br from-[#17395c0d] to-[#f4df1714] 
      border-l-4 border-[#f4df17]"
        >
            <h4 className="font-extrabold text-[#17395c] mb-2">{title}</h4>

            <div>{children}</div>
        </div>
    );
}


