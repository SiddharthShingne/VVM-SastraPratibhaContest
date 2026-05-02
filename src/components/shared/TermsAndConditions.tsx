/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-[#f4f6fb]">

            {/* ================= Breadcrumb Header ================= */}
            <div className="bg-[#162a4a] py-12.5">
                <div className="max-w-6xl mx-auto px-4 text-white">
                    <h1 className="text-[27px] font-medium mb-1">
                        Terms & Conditions
                    </h1>

                    <p className="text-[12px] opacity-90">
                        <Link href="/" className="hover:underline">Home</Link> {" > "} Terms & Conditions
                    </p>
                </div>
            </div>

            {/* ================= MAIN ================= */}
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Glass Card */}
                    <div className="relative rounded-[28px] overflow-hidden 
            bg-white/75 border border-white/60 backdrop-blur-xl 
            shadow-[0_22px_50px_rgba(23,57,92,0.11)]">

                        {/* Gradient Top Strip */}
                        <div className="absolute top-0 left-0 w-full h-1.25 
              bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                        <div className="p-8">

                            {/* Header */}
                            <div className="text-center mb-10">
                                <span className="text-[20px] font-semibold">
                                    VVM Exam
                                </span>

                                <h2 className="text-[35px] font-extrabold text-[#17395c] mt-2">
                                    Terms & Conditions
                                </h2>

                                <p className="text-[#4f6480] mt-3 text-[15px] max-w-2xl mx-auto">
                                    By using this application, you agree to follow the rules and guidelines outlined below.
                                </p>
                            </div>

                            {/* ================= CONTENT ================= */}
                            <div className="space-y-6 text-[#4f6480] text-[15px] leading-relaxed">

                                <Section title="1. Use of the App">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>This app is designed for students of Classes 6 to 11.</li>
                                        <li>It must only be used for educational and examination purposes.</li>
                                    </ul>
                                </Section>

                                <Section title="2. Exam Rules">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Students must follow all instructions provided in the app.</li>
                                        <li>Cheating, switching apps, screenshots, or unfair means may lead to disqualification.</li>
                                        <li>Camera, microphone, and internet usage may be monitored.</li>
                                    </ul>
                                </Section>

                                <Section title="3. Data & Privacy">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Personal data (name, class, answers, results) is collected only for exam purposes.</li>
                                        <li>Data may be shared with institutions but will not be sold or misused.</li>
                                        <li>Please refer to the Privacy Policy for more details.</li>
                                    </ul>
                                </Section>

                                <Section title="4. Restrictions">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Do not copy, modify, or reverse engineer the application.</li>
                                        <li>Do not use the app for illegal or harmful activities.</li>
                                        <li>No unauthorized access, hacking, or disruption attempts.</li>
                                    </ul>
                                </Section>

                                <Section title="5. Intellectual Property">
                                    All content belongs to Śāstra Pratibhā Contest(VVM). Users are granted limited, non-transferable rights strictly for exam purposes.
                                </Section>

                                <Section title="6. Disclaimer of Liability">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>We do not guarantee uninterrupted or error-free service.</li>
                                        <li>We are not responsible for issues due to internet or device failures.</li>
                                        <li>Final responsibility lies with the respective institution.</li>
                                    </ul>
                                </Section>

                                <Section title="7. Changes to Terms">
                                    These Terms & Conditions may be updated. Continued use of the app indicates acceptance of any updates.
                                </Section>

                                <Section title="8. Contact Us">
                                    For any queries regarding these terms:
                                    <br />
                                    <span className="font-semibold text-[#17395c]">
                                        Email: admin@vvm.org.in
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

/* ================= Reusable Section ================= */
function Section({ title, children }: any) {
    return (
        <div className="p-5 rounded-[18px] 
      bg-linear-to-br from-[#17395c0d] to-[#f4df1714] 
      border-l-4 border-[#f4df17]">

            <h4 className="font-extrabold text-[#17395c] mb-2">
                {title}
            </h4>

            <div>{children}</div>
        </div>
    );
}