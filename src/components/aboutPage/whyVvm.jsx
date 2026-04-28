/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Mail, Phone, MessageCircle, MapPin } from "lucide-react";

const WhyVVM = () => {
    const contactItems = [
        {
            icon: <Mail className="w-10 h-10 text-[#2955c2]" />,
            title: "E-MAIL ID",
            content: ["office@vvm.org.in"],
        },
        {
            icon: <Phone className="w-10 h-10 text-[#2955c2]" />,
            title: "LANDLINE NO",
            content: ["011-49032436"],
        },
        {
            icon: <MessageCircle className="w-10 h-10 text-[#2955c2]" />,
            title: "WHATSAPP",
            content: ["9899615277", "9266034649"],
        },
        {
            icon: <MapPin className="w-10 h-10 text-[#2955c2]" />,
            title: "OUR LOCATION",
            content: [
                "VVM Secretariat,",
                "Vijnana Bharati (VIBHA),",
                "D-12, South Extension-I,",
                "New Delhi - 110049",
            ],
        },
    ];

    return (
        <div>
      

            {/* Opportunities Section (Hero Card Style) */}
            <div className="relative mt-10 px-4 sm:px-6 lg:px-10">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-[28px] overflow-hidden 
                        bg-white/70 border border-white/60 backdrop-blur-xl
                        shadow-[0_22px_50px_rgba(23,57,92,0.11)]">

                        {/* Top Gradient Border */}
                        <div className="absolute top-0 left-0 w-full h-1.25
                            bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                        <div className="p-8 flex flex-col justify-between h-full">

                            <h3 className="text-xl font-semibold text-[#111d35] mb-4">
                                VVM offers unique opportunities for participants, including:
                            </h3>

                            <ul className="list-disc pl-5 text-[16px] leading-[1.85] text-[#4f6480] space-y-2">
                                <li>Experiential learning and hands-on activities</li>
                                <li>Know the rich heritage of India’s scientific contributions</li>
                                <li>Fostering national pride through the Indian Knowledge System</li>
                                <li>Peer evaluation and review</li>
                                <li>Comprehensive 360-degree assessment</li>
                                <li>Meet brilliant peers from across the nation</li>
                                <li>Mentorship from renowned scientists</li>
                                <li>Visits to national laboratories (ISRO, CSIR, DRDO, IITs, IISERs, NITs)</li>
                                <li>Personality development and leadership skills</li>
                                <li>Holistic development of the child</li>
                                <li>Career development guidance</li>
                                <li>Developing willingness to serve society</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-12 mt-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {contactItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-2xl p-6 text-center flex flex-col items-center h-full
                            bg-white/80 backdrop-blur-lg border border-white/60
                            shadow-[0_14px_30px_rgba(31,60,91,0.09)]
                            hover:shadow-[0_22px_44px_rgba(23,57,92,0.14)]
                            transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Top Gradient Border */}
                            <div className="absolute top-0 left-0 w-full h-1 
                                bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                            <div className="mb-4">{item.icon}</div>

                            <h4 className="text-sm font-extrabold text-[#17395c] uppercase tracking-wider mb-2">
                                {item.title}
                            </h4>

                            <div className="text-[#4f6480] text-[14px] font-semibold space-y-1">
                                {item.content.map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default WhyVVM;